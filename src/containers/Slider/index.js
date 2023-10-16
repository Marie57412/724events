import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  // Récupération des données à partir du contexte Data.
  const { data } = useData();
  // Initialisation de l'index de la carte actuellement affichée.
  const [index, setIndex] = useState(0);

  // Tri des événements par date décroissante.
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  // Fonction pour passer à la carte suivante.
  const nextCard = () => {
    if (byDateDesc) {
      // Utilisation d'un délai de 5000 ms (5 secondes) pour passer à la carte suivante. et ajout de -1 car il n'y a que 3 images
      setTimeout(
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };

  // Utilisation de useEffect pour déclencher automatiquement nextCard au chargement de la composante.
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((bulletpoint, radioIdx) => (
                <input
                  key={`${bulletpoint.title}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
