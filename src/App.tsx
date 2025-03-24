import React, { useState } from 'react';
import { Gift, Package, Star, Phone, Mail, MapIcon, Menu, X, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const templateParams = {
        to_email: 'kanandav19@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.description
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert('Orçamento solicitado com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', email: '', phone: '', description: '' });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const galleryImages = [
    {
      url: "/images/gallery/convites.jpg",
      title: "Convites Personalizados"
    },
    {
      url: "/images/gallery/decoracoes.jpg",
      title: "Decorações para Festas"
    },
    {
      url: "/images/gallery/tags.jpg",
      title: "Tags e Etiquetas"
    },
    {
      url: "/images/gallery/topos.jpg",
      title: "Topos para Doces"
    },
    {
      url: "/images/gallery/mimos.jpg",
      title: "Mimos Especiais"
    },
    {
      url: "/images/gallery/papelaria.jpg",
      title: "Papelaria Personalizada"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f2ed]">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-[#e94d97]">Kananda</h1>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#produtos" className="text-gray-600 hover:text-[#e94d97]">Produtos</a>
              <a href="#galeria" className="text-gray-600 hover:text-[#e94d97]">Galeria</a>
              <a href="#personalizados" className="text-gray-600 hover:text-[#e94d97]">Personalizados</a>
              <a href="#orcamento" className="text-gray-600 hover:text-[#e94d97]">Orçamento</a>
              <a href="#contato" className="text-gray-600 hover:text-[#e94d97]">Contato</a>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-4`}>
            <div className="flex flex-col space-y-4">
              <a href="#produtos" className="text-gray-600 hover:text-[#e94d97]" onClick={() => setIsMenuOpen(false)}>Produtos</a>
              <a href="#galeria" className="text-gray-600 hover:text-[#e94d97]" onClick={() => setIsMenuOpen(false)}>Galeria</a>
              <a href="#personalizados" className="text-gray-600 hover:text-[#e94d97]" onClick={() => setIsMenuOpen(false)}>Personalizados</a>
              <a href="#orcamento" className="text-gray-600 hover:text-[#e94d97]" onClick={() => setIsMenuOpen(false)}>Orçamento</a>
              <a href="#contato" className="text-gray-600 hover:text-[#e94d97]" onClick={() => setIsMenuOpen(false)}>Contato</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-16 bg-gradient-to-b from-[#9f7cc2] to-[#f5f2ed] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-[#e94d97] mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
              Kananda
            </h1>
            <p className="text-2xl md:text-3xl text-[#4a9c2d] font-semibold">mimos personalizados</p>
            <a 
              href="#orcamento" 
              className="inline-block mt-8 px-8 py-3 bg-[#e94d97] text-white rounded-full hover:bg-[#d43d86] transition-colors shadow-lg"
            >
              Solicitar Orçamento
            </a>
          </div>
        </div>
      </header>

      {/* Products Section */}
      <section id="produtos" className="py-20 container mx-auto px-4">
        <h2 className="text-4xl text-[#c5a34c] text-center font-bold mb-12">Nossos Produtos</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Gift, title: 'Convites', desc: 'Convites personalizados para todas as ocasiões' },
            { icon: Package, title: 'Mimos de Papel', desc: 'Tags, etiquetas e decorações especiais' },
            { icon: Star, title: 'Topos para Doces', desc: 'Topos decorativos para docinhos e cupcakes' }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <item.icon className="w-16 h-16 text-[#e94d97]" />
              </div>
              <h3 className="text-2xl font-bold text-[#c5a34c] text-center mb-4">{item.title}</h3>
              <p className="text-gray-600 text-center text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-[#c5a34c] text-center font-bold mb-12">Nossa Galeria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3]">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <h3 className="text-white text-xl font-semibold p-6 w-full text-center">
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="personalizados" className="bg-[#f5f2ed] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl text-[#c5a34c] text-center font-bold mb-12">Produtos Personalizados</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <ul className="space-y-6">
                {[
                  'Convites',
                  'Mimos de Papel',
                  'Tags',
                  'Etiquetas Escolares',
                  'Topo para Docinhos e Cupcake'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-xl">
                    <span className="w-3 h-3 bg-[#e94d97] rounded-full mr-4"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img 
                src="/images/gallery/produtos-personalizados.jpg"
                alt="Produtos personalizados"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request Section */}
      <section id="orcamento" className="py-20 container mx-auto px-4">
        <h2 className="text-4xl text-[#c5a34c] text-center font-bold mb-12">Solicite um Orçamento</h2>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#e94d97] focus:ring focus:ring-[#e94d97] focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#e94d97] focus:ring focus:ring-[#e94d97] focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#e94d97] focus:ring focus:ring-[#e94d97] focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700 mb-2">Descrição do Pedido</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#e94d97] focus:ring focus:ring-[#e94d97] focus:ring-opacity-50"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#e94d97] text-white py-3 rounded-lg hover:bg-[#d43d86] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Enviando...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Pedido</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 container mx-auto px-4">
        <h2 className="text-4xl text-[#c5a34c] text-center font-bold mb-12">Entre em Contato</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <a 
            href="tel:+5585992856558" 
            className="flex items-center bg-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-[#e94d97] hover:text-[#c5a34c]"
          >
            <Phone className="w-6 h-6 mr-3" />
            <span>Telefone</span>
          </a>
          <a 
            href="https://wa.me/5585992856558" 
            className="flex items-center bg-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-[#e94d97] hover:text-[#c5a34c]"
          >
            <MapIcon className="w-6 h-6 mr-3" />
            <span>WhatsApp</span>
          </a>
          <a 
            href="mailto:kanandav19@gmail.com" 
            className="flex items-center bg-white px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-[#e94d97] hover:text-[#c5a34c]"
          >
            <Mail className="w-6 h-6 mr-3" />
            <span>Email</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#9f7cc2] text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">© 2025 Kananda Mimos Personalizados. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;