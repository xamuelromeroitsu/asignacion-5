function ContactPage() {
  return (
    <section className="page-content">
      <h1>Contacto</h1>
      <p>¿Tienes alguna pregunta o sugerencia? Nos encantaria escucharte.</p>

      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <label className="field-group">
          <span>Nombre</span>
          <input type="text" placeholder="Tu nombre" />
        </label>

        <label className="field-group">
          <span>Correo electronico</span>
          <input type="email" placeholder="tu@correo.com" />
        </label>

        <label className="field-group">
          <span>Mensaje</span>
          <textarea rows={4} placeholder="Escribe tu mensaje aqui..." />
        </label>

        <button type="submit" className="product-button">
          Enviar mensaje
        </button>
      </form>
    </section>
  )
}

export default ContactPage
