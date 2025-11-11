import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import "./Team.css";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  social: {
    whatsapp: string;
    linkedin: string;
    instagram: string;
  };
}

const Team = () => {
  const teamRef = useRef<HTMLDivElement[]>([]);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Chioma Adeyemi",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      social: {
        whatsapp: "https://wa.me/1234567890",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
      },
    },
    {
      id: 2,
      name: "Tunde Okafor",
      role: "Toy Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      social: {
        whatsapp: "https://wa.me/1234567890",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
      },
    },
    {
      id: 3,
      name: "Amina Yusuf",
      role: "Customer Care",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      social: {
        whatsapp: "https://wa.me/1234567890",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
      },
    },
    {
      id: 4,
      name: "Emeka Nwosu",
      role: "Delivery Manager",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      social: {
        whatsapp: "https://wa.me/1234567890",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
      },
    },
  ];

  useEffect(() => {
    teamRef.current.forEach((member, index) => {
      gsap.from(member, {
        scrollTrigger: {
          trigger: member,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
      });
    });
  }, []);

  const addToTeamRef = (el: HTMLDivElement | null) => {
    if (el && !teamRef.current.includes(el)) {
      teamRef.current.push(el);
    }
  };

  return (
    <section id="team" className="team">
      <div className="team-container">
        <div className="team-header">
          <h2 className="team-title">Meet Our Family</h2>
          <p className="team-subtitle">
            The passionate people behind your child's happiness
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} ref={addToTeamRef} className="team-card">
              <div className="team-image-wrapper">
                <img src={member.image} alt={member.name} className="team-image" />
                <div className="team-overlay">
                  <div className="team-social">
                    <a
                      href={member.social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-social-link"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle size={20} />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-social-link"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-social-link"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
