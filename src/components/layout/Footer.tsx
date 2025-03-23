
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold tracking-tight">
              Fala Fácil
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Aprenda inglês com confiança através de nossas lições interativas, flashcards e comunidade.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook size={18} />} />
              <SocialLink href="#" icon={<Instagram size={18} />} />
              <SocialLink href="#" icon={<Twitter size={18} />} />
              <SocialLink href="#" icon={<Linkedin size={18} />} />
            </div>
          </div>
          
          <FooterLinks
            title="Aprender"
            links={[
              { label: "Lições", href: "/licoes" },
              { label: "Flashcards", href: "/flashcards" },
              { label: "Pronúncia", href: "/pronuncia" },
              { label: "Gramática", href: "/gramatica" },
            ]}
          />
          
          <FooterLinks
            title="Comunidade"
            links={[
              { label: "Fóruns", href: "/foruns" },
              { label: "Eventos", href: "/eventos" },
              { label: "Classificação", href: "/classificacao" },
              { label: "Histórias de Sucesso", href: "/historias-sucesso" },
            ]}
          />
          
          <FooterLinks
            title="Empresa"
            links={[
              { label: "Sobre Nós", href: "/sobre" },
              { label: "Carreiras", href: "/carreiras" },
              { label: "Blog", href: "/blog" },
              { label: "Contato", href: "/contato" },
            ]}
          />
        </div>
        
        <div className="mt-12 pt-6 border-t border-muted flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2023 Fala Fácil. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/termos" className="hover:text-foreground transition-colors">
              Termos
            </Link>
            <Link to="/privacidade" className="hover:text-foreground transition-colors">
              Privacidade
            </Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink = ({ href, icon }: SocialLinkProps) => (
  <a 
    href={href} 
    className="h-8 w-8 flex items-center justify-center rounded-full bg-background text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

interface FooterLinksProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterLinks = ({ title, links }: FooterLinksProps) => (
  <div className="space-y-4">
    <h4 className="font-medium">{title}</h4>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link 
            to={link.href} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
