import { Link } from 'react-router-dom';
export default function AuthShell({ title, children }: { title: string; children: React.ReactNode }) {
     return <div className="min-h-[80vh] grid lg:grid-cols-2">
          <div className="hidden lg:block bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85')] bg-cover bg-center" />
          <div className="grid place-items-center p-8">
               <div className="w-full max-w-md">
                    <Link to="/" className="serif text-3xl">fabora</Link>
                    <h1 className="serif text-4xl mt-14 mb-3">{title}</h1>
                    {children}
               </div>
          </div>
     </div>
}
