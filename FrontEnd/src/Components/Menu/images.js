import BaristaEspresso from '../Assets/menu_image/Coffee/BaristaEspresso.jpg';
import DripCoffee from '../Assets/menu_image/Coffee/DripCoffee.jpg';
import GourmetBrewedCoffee from'../Assets/menu_image/Coffee/GourmetBrewedCoffee.jpg';
import OrganicBrewedCoffee from '../Assets/menu_image/Coffee/OrganicBrewedCoffee.jpg';
import PremiumBrewedCoffee from '../Assets/menu_image/Coffee/PremiumBrewedCoffee.jpg';

import HotChocolate from '../Assets/menu_image/Chocolate/HotChocolate.jpg';

import BlackTea from '../Assets/menu_image/LooseTea/BlackTea.jpg';
import ChaiTea from '../Assets/menu_image/LooseTea/ChaiTea.jpg';
import GreenTea from '../Assets/menu_image/LooseTea/GreenTea.jpg';
import HerbalTea from '../Assets/menu_image/LooseTea/HerbalTea.jpg';

import BrewedBlackTea from '../Assets/menu_image/Tea/BrewedBlackTea.jpg';
import BrewedChaiTea from '../Assets/menu_image/Tea/BrewedChaiTea.jpg';
import BrewedGreenTea from '../Assets/menu_image/Tea/BrewedGreenTea.jpg';
import BrewedHerbalTea from '../Assets/menu_image/Tea/BrewedHerbalTea.jpg';

import Biscotti from '../Assets/menu_image/Bakery/Biscotti.jpg';
import Pastry from '../Assets/menu_image/Bakery/Pastry.jpg';
import Scone from '../Assets/menu_image/Bakery/Scone.jpg';

import EspressoBeans from '../Assets/menu_image/CoffeeBeans/EspressoBeans.jpg';
import GourmetBeans from '../Assets/menu_image/CoffeeBeans/GourmetBeans.jpg';
import GreenBeans from '../Assets/menu_image/CoffeeBeans/GreenBeans.jpg';
import HouseBlendBeans from '../Assets/menu_image/CoffeeBeans/HouseBlendBeans.jpg';
import OrganicBeans from '../Assets/menu_image/CoffeeBeans/OrganicBeans.jpg';
import PremiumBeans from '../Assets/menu_image/CoffeeBeans/PremiumBeans.jpg';


const images = {
    Coffee: {
        'Barista Espresso': BaristaEspresso,
        'Drip coffee': DripCoffee,
        'Gourmet brewed coffee': GourmetBrewedCoffee,
        'Organic brewed coffee': OrganicBrewedCoffee,
        'Premium brewed coffee': PremiumBrewedCoffee
    },
    Chocolate: {
        'Hot chocolate': HotChocolate
    },
    Tea: {
        'Brewed Black tea': BrewedBlackTea,
        'Brewed Chai tea': BrewedChaiTea,
        'Brewed Green tea': BrewedGreenTea,
        'Brewed herbal tea': BrewedHerbalTea
    },
    Bakery: {
        'Biscotti': Biscotti,
        'Pastry': Pastry,
        'Scone': Scone
    },
    LooseTea: {
        'Black tea': BlackTea,
        'Chai tea': ChaiTea,
        'Green tea': GreenTea,
        'Herbal tea': HerbalTea
    },
    CoffeeBeans: {
        'Espresso Beans': EspressoBeans, 
        'Gourmet Beans': GourmetBeans, 
        'Green beans': GreenBeans, 
        'House blend Beans': HouseBlendBeans, 
        'Organic Beans': OrganicBeans, 
        'Premium Beans': PremiumBeans
    }
};

export default images;
