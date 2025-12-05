export function getErrorMessage(error, options = {}) {
  const status = error?.response?.status;
  const data = error?.response?.data;
  const url = error?.config?.url || '';

  let msg = null;
  if (typeof data === 'string' && data.trim()) {
    msg = data.trim();
  } else if (data?.message && String(data.message).trim()) {
    msg = String(data.message).trim();
  } else if (data?.error && String(data.error).trim()) {
    msg = String(data.error).trim();
  }

  if (status === 400) {
    const messages = [];
    if (Array.isArray(data?.errors)) {
      for (const e of data.errors) {
        if (typeof e === 'string') messages.push(e);
        else if (e?.message) messages.push(e.message);
        else if (e?.defaultMessage) messages.push(e.defaultMessage);
      }
    } else if (data?.errors && typeof data.errors === 'object') {
      for (const v of Object.values(data.errors)) {
        messages.push(String(v));
      }
    } else if (Array.isArray(data?.fieldErrors)) {
      for (const e of data.fieldErrors) {
        if (e?.message) messages.push(e.message);
        else messages.push(`${e?.field ?? ''}: ${e?.defaultMessage ?? 'inválido'}`.trim());
      }
    }
    if (messages.length) return messages.join(' • ');
    return msg || 'Dados inválidos.';
  }

  switch (status) {
    case 401:
      if (options?.context === 'login' || url.includes('/auth/login')) {
        return 'Senha e/ou usuário inválidos';
      }
      return 'Autenticação necessária.';
    case 403:
      return 'Você não tem permissão para acessar este recurso.';
    case 404:
      return msg || 'Recurso não encontrado.';
    case 409:
      if (options?.context === 'signup' || options?.context === 'adminUsers') {
        return 'Usuário já existe.';
      }
      return msg || 'Conflito de dados.';
    case 422:
      return msg || 'Dados inválidos.';
    case 500:
      if (options?.context === 'signup' || options?.context === 'adminUsers' || url.includes('/auth/signup') || url.includes('/admin/users')) {
        return 'Usuário já existe.';
      }
      return msg && msg !== 'Internal Server Error' ? msg : 'Erro interno do servidor. Tente novamente mais tarde.';
    default:
      if (options?.context === 'alunos' && (options?.action === 'create' || options?.action === 'delete')) {
        return 'Você não tem permissão para acessar este recurso.';
      }
      return msg || 'Erro ao processar a solicitação.';
  }
}
