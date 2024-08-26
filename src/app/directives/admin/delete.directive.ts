import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService
  ) {
    debugger
    const img = _renderer.createElement("img")
    img.setAttribute("src", "../../../../../assets/icons/delete.png")
    img.setAttribute("style", "cursor:pointer")
    img.width = 25
    img.height = 25
    _renderer.appendChild(element.nativeElement, img)
  }
}
