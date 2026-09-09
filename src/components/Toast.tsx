import {useEffect,useState} from 'react';
let pushToast:(m:string)=>void=()=>{};export const toast=(m:string)=>pushToast(m);
export default function ToastHost(){const [message,setMessage]=useState('');useEffect(()=>{pushToast=setMessage;return()=>{pushToast=()=>{}}},[]);useEffect(()=>{if(!message)return;const t=setTimeout(()=>setMessage(''),2600);return()=>clearTimeout(t)},[message]);if(!message)return null;return <div className="fixed z-[80] bottom-6 left-1/2 -translate-x-1/2 bg-ink text-white px-5 py-3 text-xs shadow-xl">{message}</div>}
