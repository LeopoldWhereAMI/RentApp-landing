import "./styles/styles.css";
import { createIcons, icons } from "lucide";
import Header from "./scripts/components/Header";
import Inventory from "./scripts/components/Inventory";
import ContactForm from "./scripts/components/ContactsForm";
import Reviews from "./scripts/components/reviews";

createIcons({ icons });

new Header();
new Inventory().init();
new ContactForm();
new Reviews();
