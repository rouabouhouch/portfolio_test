export async function askGemini(message: string, history: { role: 'user' | 'model', text: string }[]) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.text || "Désolé, je ne peux pas répondre pour le moment.";
  } catch (error) {
    console.error("Error calling backend:", error);
    return "Une erreur est survenue lors de la communication avec l'assistant.";
  }
}
