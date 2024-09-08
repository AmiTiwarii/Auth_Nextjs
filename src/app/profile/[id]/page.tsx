export default function UserProfile({params}: any){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Profile </h1>
            <hr />
            <p className="text-4xl">Profile Page <span className="p-2 bg-gradient-to-r from-violet-500 to-green-500 text-transparent bg-clip-text">{params.id}</span></p>
        </div>
    )
}