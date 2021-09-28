// every user should have an image import here
// for users without such an image, a default
// image is supplied (Asterix's Julius Caesar)

import Antoninus from '../assets/Antoninus-Pius.jpg';
import Marcus from '../assets/Marcus-Aurelius.jpg';
import Nerva from '../assets/Nerva.jpg';
import Trajanus from '../assets/Trajanus.jpg';

import Default from '../assets/Julius.jpg';

const images = {
    Antoninus,
    Marcus,
    Nerva,
    Trajanus,
};

function GetImage(name) {
    if (images[name]) return (images[name]);
    return (Default);
}

export default GetImage