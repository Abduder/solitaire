import {
    ImSpades,
    ImDiamonds,
    ImClubs
} from "react-icons/im";
import {
    GiHearts
} from "react-icons/gi";

const typeIcons = {
    "spades": <ImSpades />,
    "diamonds": <ImDiamonds />,
    "hearts": <GiHearts />,
    "clubs": <ImClubs />,
}

const CardFront = ({ styles, card }) => {
    const { type, number } = card;
    return (
        <span className="card front" style={styles}>
            <span className="cardNumber" style={{ top: 0, left: 0 }}>{number}</span>
            <span className='cardIcon'>{typeIcons[type]}</span>
            <span className="cardNumber" style={{ bottom: 0, right: 0 }}>{number}</span>
        </span>
    );
}
const CardBack = ({ styles, onClick }) => {
    if(onClick) styles["cursor"] = "pointer";
    return (
        <span className="card back" style={styles} onClick={onClick}></span>
    );
}
const CardPlaceholder = ({ styles }) => (<span className="card placeholder" style={styles}></span>);

export {
    CardBack,
    CardFront,
    CardPlaceholder
}