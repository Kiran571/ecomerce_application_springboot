import { Directive, HostBinding, HostListener, Output,EventEmitter } from '@angular/core';
import { FileHandle } from './_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]',
  standalone: true,
  
})
export class DragDirective {
  constructor(private _sanitizer: DomSanitizer){}

  @Output() dropFiles: EventEmitter<FileHandle> = new EventEmitter();

  @HostBinding('style.background') public background = '#FFE4E1';
  
  @HostListener('dragover',['$event']) public onDragOver(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#C6E4F1';
 
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt : DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#FFE4E1';
    
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#FFE4E1';
 
    let fileHandle: FileHandle = null;
    const file = evt.dataTransfer.files[0];

    const url = this._sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );

    fileHandle = { file, url};
    this.dropFiles.emit(fileHandle);
  
  }
  
  

}
