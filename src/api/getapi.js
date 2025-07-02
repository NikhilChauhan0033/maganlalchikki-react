import axios from "axios";

async function getAPI(url) {   // Defining the getAPI Function,  Parameter (url)
  axios.defaults.baseURL = "https://appy.trycatchtech.com/v3/maganlalchikki/";   //Setting the Base URL for AxiosThis sets the base URL for all requests made using axios. Instead of writing the full URL every time, we can now just provide the endpoint (url).
  
  try {
    const response = await axios.get(url);  //Making the API Request Using axios.get
    return response;
  } catch (error) {
    throw error;
  }
}

export default getAPI;
