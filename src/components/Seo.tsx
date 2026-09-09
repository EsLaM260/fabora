import {Helmet} from 'react-helmet-async';
export default function Seo({title,description='fabora — modern fashion for Egypt and the UAE.'}:{title:string;description?:string}){return <Helmet><title>{title} — fabora</title><meta name="description" content={description}/><meta property="og:title" content={`${title} — fabora`}/><meta property="og:description" content={description}/></Helmet>}
