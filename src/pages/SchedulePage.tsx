import { useMemo, useState } from 'react'
import AppShell from '../components/AppShell'

type ScheduleBlock = { start: string; end: string; duration: string }

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
const initialBlocks: Record<string, ScheduleBlock[]> = {
  Lunes: [{ start: '09:00', end: '12:00', duration: '30 min' }, { start: '14:00', end: '17:00', duration: '30 min' }],
  Martes: [{ start: '09:00', end: '13:00', duration: '30 min' }],
  Miércoles: [{ start: '09:00', end: '12:00', duration: '30 min' }],
  Jueves: [],
  Viernes: [{ start: '09:00', end: '12:00', duration: '45 min' }],
}
const timeOptions = ['08:00', '09:00', '10:00', '12:00', '13:00', '14:00', '17:00', '18:00']

function slotCount(block: ScheduleBlock) {
  const [startHour, startMinute] = block.start.split(':').map(Number)
  const [endHour, endMinute] = block.end.split(':').map(Number)
  return Math.max(0, Math.floor(((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) / Number(block.duration.split(' ')[0])))
}

function SchedulePage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ Lunes: true, Martes: true, Miércoles: true, Jueves: false, Viernes: true })
  const [blocks, setBlocks] = useState(initialBlocks)
  const [blockedDates, setBlockedDates] = useState([{ date: 'Miércoles, 23 de septiembre', reason: 'Congreso médico' }])
  const availableSlots = useMemo(() => days.reduce((total, day) => total + (enabled[day] ? blocks[day].reduce((sum, block) => sum + slotCount(block), 0) : 0), 0), [blocks, enabled])

  function updateBlock(day: string, index: number, field: keyof ScheduleBlock, value: string) {
    setBlocks((current) => ({ ...current, [day]: current[day].map((block, blockIndex) => blockIndex === index ? { ...block, [field]: value } : block) }))
  }
  function addBlock(day: string) {
    setEnabled((current) => ({ ...current, [day]: true }))
    setBlocks((current) => ({ ...current, [day]: [...current[day], { start: '09:00', end: '12:00', duration: '30 min' }] }))
  }

  return <AppShell role="doctor">
    <section className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-cyan-700">DISPONIBILIDAD</p><h1 className="mt-1 text-3xl font-semibold text-slate-900">Pool de horarios semanal</h1><p className="mt-2 text-slate-500">Define tus bloques de atención y los cupos se generarán automáticamente.</p></div><span className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">Semana del 21 al 25 de septiembre</span></section>

    <section className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-6"><div><h2 className="font-semibold text-slate-900">Bloques de atención</h2><p className="mt-1 text-sm text-slate-500">Indica inicio, fin y duración de cada cita.</p></div><span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600">{availableSlots} cupos generados</span></div>
      <div className="divide-y divide-slate-100">{days.map((day) => <div className="p-5 sm:p-6" key={day}>
        <div className="flex flex-wrap items-center gap-4"><button aria-label={`Cambiar disponibilidad de ${day}`} aria-pressed={enabled[day]} className={`relative h-6 w-11 rounded-full transition ${enabled[day] ? 'bg-cyan-600' : 'bg-slate-200'}`} onClick={() => setEnabled((current) => ({ ...current, [day]: !current[day] }))} type="button"><span className={`absolute top-1 size-4 rounded-full bg-white transition ${enabled[day] ? 'left-6' : 'left-1'}`} /></button><h3 className="w-28 font-semibold text-slate-900">{day}</h3>{!enabled[day] && <span className="text-sm text-slate-400">No disponible</span>}</div>
        {enabled[day] && <div className="mt-4 space-y-3 sm:ml-15">{blocks[day].map((block, index) => <div className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-[1fr_1fr_1fr_auto]" key={`${day}-${index}`}>
          <label className="text-xs font-semibold text-slate-500">INICIO<select className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700" onChange={(event) => updateBlock(day, index, 'start', event.target.value)} value={block.start}>{timeOptions.map((time) => <option key={time}>{time}</option>)}</select></label>
          <label className="text-xs font-semibold text-slate-500">FIN<select className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700" onChange={(event) => updateBlock(day, index, 'end', event.target.value)} value={block.end}>{timeOptions.map((time) => <option key={time}>{time}</option>)}</select></label>
          <label className="text-xs font-semibold text-slate-500">DURACIÓN<select className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700" onChange={(event) => updateBlock(day, index, 'duration', event.target.value)} value={block.duration}><option>20 min</option><option>30 min</option><option>45 min</option><option>60 min</option></select></label>
          <div className="flex items-end"><span className="w-full rounded-lg bg-cyan-50 px-3 py-2 text-center text-sm font-semibold text-cyan-700">{slotCount(block)} cupos</span></div>
        </div>)}<button className="text-sm font-semibold text-cyan-700 hover:text-cyan-800" onClick={() => addBlock(day)} type="button">+ Agregar bloque</button></div>}
      </div>)}</div>
      <div className="flex justify-end border-t border-slate-100 p-5"><button className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700" type="button">Guardar horarios</button></div>
    </section>

    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold text-slate-900">Bloqueos puntuales</h2><p className="mt-1 text-sm text-slate-500">Ausencias o feriados que no usan tu horario habitual.</p></div><button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50" onClick={() => setBlockedDates((current) => [...current, { date: 'Viernes, 25 de septiembre', reason: 'Feriado' }])} type="button">+ Bloquear fecha</button></div><div className="mt-5 space-y-3">{blockedDates.map((item) => <div className="flex items-center justify-between gap-3 rounded-xl bg-amber-50 px-4 py-3" key={item.date}><div><p className="text-sm font-semibold text-amber-900">{item.date}</p><p className="text-sm text-amber-700">{item.reason}</p></div><span className="text-xs font-semibold text-amber-700">BLOQUEADO</span></div>)}</div></section>
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><div><h2 className="font-semibold text-slate-900">Cupos reservados</h2><p className="mt-1 text-sm text-slate-500">Estos horarios están protegidos por una cita activa.</p></div><div className="mt-5 rounded-xl border border-slate-200 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-semibold text-slate-900">Lunes 21 · 10:00 a. m.</p><p className="mt-1 text-sm text-slate-500">Mariana Flores · Consulta de control</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Reservado</span></div><p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-500">🔒 No puedes eliminar este cupo sin cancelar previamente la cita asociada.</p></div></section>
    </div>
  </AppShell>
}

export default SchedulePage
