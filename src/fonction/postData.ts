import axios from 'axios';

type Entreprise = {
  nomEntreprise: string;
  courEntreprise: string | null;
};

async function postData(entreprise: Entreprise[]) {
  const url = 'http://127.0.0.1:3000/entreprise';
  const data = entreprise;
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error occurred.');
    }
  }
}

export default postData;
