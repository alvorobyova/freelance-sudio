export class FileUtils {

  static loadPageScript(src) {
    return new Promise((resolve, reject) => {
      // создаем элементы, содержащие скрипты
      const script = document.createElement('script');
      // заполняем артибуты
      script.src = src;
      script.onload = () =>  {
        resolve('Script loaded: ' + src);
      };
      script.onerror = () => {
        reject(new Error('Script load error for: ' + src));
      }
      // вставляем новый элемент в конце body
      document.body.appendChild(script)
    });
  }

  static loadPageStyle(src, insertBeforeElement) {
    // создаем элементы, содержащие стили
    const link = document.createElement('link');

    // заполняем артибуты
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = src;
    // вставляем новый элемент перед элементом adminLte
    document.head.insertBefore(link, insertBeforeElement)
  }


  static convertFileToBase64(file) {
    return new Promise((resolve, reject) => {const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>  resolve(reader.result);
      reader.onerror = () => reject(new Error('Cannot convert file'));
    });


  }
}