import { Redirect } from "expo-router";

export default function Index() {

  console.log('API Key:', process.env.TMDB_API_KEY);

  return(
    <Redirect href="/login" />
  )
}
