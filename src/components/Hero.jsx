export default function Hero({ title }) {
  return (
    <section className='hero'>
      <span className='cover bg-pattern'></span>
      <div className='container'>
        <h1>{title}</h1>
      </div>
    </section>
  )
}