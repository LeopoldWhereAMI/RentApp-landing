import "./styles/styles.css";
import { createIcons, icons } from "lucide";
import Header from "./scripts/components/Header";
import Inventory from "./scripts/components/Inventory";
import ContactForm from "./scripts/components/contactsForm";

createIcons({ icons });

new Header();
new Inventory().init();
new ContactForm();
