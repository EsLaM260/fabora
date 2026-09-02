export const money=(amount:number,currency='EGP')=>new Intl.NumberFormat('en-EG',{style:'currency',currency,maximumFractionDigits:0}).format(amount);
export const localized=(value:any,lang='en')=>typeof value==='string'?value:value?.[lang]||value?.en||value?.ar||'';
export const imageOf=(media:any[],fallback:string)=>media?.[0]?.url||media?.[0]?.imageUrl||media?.[0]?.src||fallback;
