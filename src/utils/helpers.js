// Função para gerar ID único (compatível com todos os navegadores)
export function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}