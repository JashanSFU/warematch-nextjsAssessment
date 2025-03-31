export const fetchToken = async (): Promise<string> => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const email = process.env.NEXT_PUBLIC_API_LOGIN_EMAIL// 'tester@gmail.com';
    const password = process.env.NEXT_PUBLIC_API_LOGIN_PASSWORD;
  
    try {
      const response = await fetch(`${API_BASE_URL}/auth/jwt/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate token');
      }
  
      const data = await response.json();
      return data.access; // Assuming token is returned under 'access'
    } catch (error) {
      console.error('Token generation error:', error);
      throw error;
    }
  };
  