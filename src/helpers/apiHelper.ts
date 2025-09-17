export interface ApiError {
  status?: number;
  message: string;
  errors?: Record<string, string[]>; // Pour les erreurs de validation
}

/**
 * Gestion centralisée des réponses fetch
 */
export const handleApiResponse = async <T>(res: Response): Promise<T> => {
  const data = (await res.json().catch(() => ({}))) as unknown;

  if (!res.ok) {
    const status = res.status;
    let message = "Une erreur est survenue";

    // Gestion des messages d'erreur du backend
    if (data && typeof data === "object") {
      if ("message" in data) {
        message = (data as { message: string }).message;
      } else if ("errors" in data) {
        const validationErrors = (data as { errors: Record<string, string[]> })
          .errors;
        message = Object.values(validationErrors)
          .flat()
          .join(", ");
      }
    }

    throw { status, message } as ApiError;
  }

  return data as T;
};

/**
 * Récupère un message utilisateur-friendly selon le type d'erreur
 */
export const getErrorMessage = (err: unknown): string => {
  if (err && typeof err === "object" && "status" in err) {
    const apiError = err as ApiError;

    switch (apiError.status) {
      case 400:
        return "Veuillez vérifier les informations saisies";
      case 401:
        return "Identifiants invalides";
      case 403:
        return "Accès refusé";
      case 404:
        return "Ressource non trouvée";
      case 409:
        return apiError.message || "Conflit détecté";
      case 500:
        return "Erreur serveur, veuillez réessayer plus tard";
      default:
        return apiError.message || "Une erreur est survenue";
    }
  }

  if (err instanceof Error) return err.message;

  return "Une erreur inattendue est survenue";
};
