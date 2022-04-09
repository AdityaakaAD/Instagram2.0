import { getProviders, signIn as SignIntoProvider  } from "next-auth/react"
import Header from "../../Components/Header";
export default function SignIn({ providers }) {
  return (
    <>
      <Header/>
      <div className=" flex flex-col items-center justify-center min-h-screen  py-2 -mt-40 px-14">
        <img className=" w-80" src="https://links.papareact.com/ocw" alt="" />
      <div className=" mt-40">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className="p-3 -mt-5 bg-blue-500 rounded-lg text-white" onClick={() => SignIntoProvider(provider.id, {callbackUrl: "/"})}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  }
}
