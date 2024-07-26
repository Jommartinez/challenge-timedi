export const ButtonBack = () => {
  return (
    <div className='group relative h-8 w-40 overflow-hidden rounded-lg bg-blue-500 text-sm font-bold text-white flex justify-center items-center'>
      Volver al listado
      <div className='absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30'></div>
    </div>
  )
}
