import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-ulayout',
  templateUrl: './ulayout.component.html',
  styleUrls: ['./ulayout.component.css']
})
export class ULayoutComponent implements OnInit {

  private cssClass = 'dynamic-css'; // Dinamik olarak eklenen CSS'ler için sınıf adı
  private scriptElements: HTMLScriptElement[] = []; // Dimanik olarak eklenen JS'ler için sınıf adı

  constructor(private renderer: Renderer2) { }
  ngOnInit(): void {

    // Sayfa yüklendikten sonra dış CSS kodunu çalıştırmak için
    this.addCSSFile("assets/vendor/bootstrap-icons/bootstrap-icons.css")
    this.addCSSFile("assets/vendor/bootstrap/css/bootstrap.min.css")
    this.addCSSFile("assets/vendor/aos/aos.css")
    this.addCSSFile("assets/vendor/glightbox/css/glightbox.min.css")
    this.addCSSFile("assets/vendor/swiper/swiper-bundle.min.css")
    this.addCSSFile("assets/css/main.css")

    // Sayfa yüklendikten sonra dış JS kodunu çalıştırmak için
    this.AddScriptFile("assets/vendor/bootstrap/js/bootstrap.bundle.min.js")
    this.AddScriptFile("assets/vendor/aos/aos.js")
    this.AddScriptFile("assets/vendor/purecounter/purecounter_vanilla.js")
    this.AddScriptFile("assets/vendor/glightbox/js/glightbox.min.js")
    this.AddScriptFile("assets/vendor/swiper/swiper-bundle.min.js")
    this.AddScriptFile("assets/vendor/imagesloaded/imagesloaded.pkgd.min.js")
    this.AddScriptFile("assets/vendor/isotope-layout/isotope.pkgd.min.js")
    this.AddScriptFile("assets/js/main.js")
  }
  
  //Dinamik olarak TypeScipt dosylarını ekleme
  private AddScriptFile(src: string): void {
    const scriptElement = this.renderer.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = src;
    scriptElement.async = true;
    this.renderer.appendChild(document.head, scriptElement);
    this.scriptElements.push(scriptElement);
  }
  
  //Dinamik olarak Css dosyalarını ekleme
  private addCSSFile(href: string) {
    // Daha önce aynı href'le eklenmişse tekrar ekleme
    if (!Array.from(document.querySelectorAll(`.${this.cssClass}`)).find(link => link.getAttribute('href') === href)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = href;
      link.classList.add(this.cssClass); // Sınıf ekleyerek tanımlıyoruz
      // link.onload = () => console.log(`CSS loaded: ${href}`);
      document.head.appendChild(link);
    }
  }
}
