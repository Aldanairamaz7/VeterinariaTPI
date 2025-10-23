import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { services } from "../../data/servicesList";
import "./services.css";
const Services = () => {
  return (
    <section id="services">
      <div className="services-container">
        <h2 className="services-title">Nuestros servicios</h2>
        <div className="services-grid">
          {services.map((serv, index) => (
            <div className="services-card" key={index}>
              <FontAwesomeIcon icon={serv.icon} className="services-icon" />
              <h3>{serv.title}</h3>
              <p className="services-description">{serv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
