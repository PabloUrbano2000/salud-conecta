import { Link } from "react-router";
import { specialties } from "../data/mockData";

function AdminPage() {
  return (
    <main className="min-h-svh bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link className="flex items-center gap-2 font-semibold text-slate-900 no-underline" to="/">
            <span className="grid size-8 place-items-center rounded-lg bg-cyan-600 text-lg text-white">+</span>
            SaludConecta <span className="font-normal text-slate-400">Admin</span>
          </Link>
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">Administrador</span>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 sm:px-8 md:grid-cols-[190px_1fr]">
        <aside className="flex gap-2 overflow-x-auto md:block md:space-y-2">
          <Link className="whitespace-nowrap rounded-xl bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700 md:block" to="/admin">Especialidades</Link>
          <Link className="whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-white md:block" to="/administracion/validaciones">Validar doctores</Link>
        </aside>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-wide text-cyan-700">CATÁLOGOS</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">Especialidades</h1>
              <p className="mt-2 text-slate-600">Gestiona las especialidades disponibles para los profesionales.</p>
            </div>
            <button className="rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-700" type="button">+ Agregar especialidad</button>
          </div>

          <div className="mt-7 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            {specialties.map((specialty, index) => (
              <article className={`flex flex-wrap items-center gap-4 px-5 py-4 sm:px-6 ${index !== specialties.length - 1 ? "border-b border-slate-100" : ""}`} key={specialty.name}>
                <div className="grid size-10 place-items-center rounded-xl bg-cyan-50 text-lg text-cyan-700">✦</div>
                <div className="min-w-40 flex-1">
                  <h2 className="font-semibold text-slate-900">{specialty.name}</h2>
                  <p className="mt-0.5 text-sm text-slate-500">{specialty.description}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${specialty.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                  {specialty.active ? "Activa" : "Inactiva"}
                </span>
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50" type="button">Editar</button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminPage;
