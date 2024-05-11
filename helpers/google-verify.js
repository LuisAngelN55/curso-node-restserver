import { OAuth2Client } from "google-auth-library";



const client = new OAuth2Client();

async function googleVerify( token = '') {

  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  
  });
  const payload = ticket.getPayload();

  const { name, email, picture } = payload;
  return {
    nombre: name,
    correo: email,
    img: picture
  }
}


export {
    googleVerify
}