//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(url){
	return new Promise((resolve,reject)=>{
		const img=new Image();
		img.src=url;
		img.onload=()=>resolve(img);
		img.onerror=()=>reject(new Error(`Failed to download image:${url}`));
	});
}
async function downloadImages(){
	loading.style.display='block';
	errorDiv.innerHTML="";
	output.innerHTML="";
	try{
		const promises=images.map((item)=>downloadImage(item.url));
		const loadedImages=await Promise.all(promises);
		loadedImages.forEach((img)=>{
			output.appendChild(img);
		});
		loading.style.display='none';
	}catch(error){
		errorDiv.innerHTML=error.message;
		loading.style.display='none';
		}
}
btn.addEventListener("click",downloadImages)
