# osGallery

jQuery ile gelişitirilmiş CSS3 ile güçlendirilmiş galeri uygulaması.

### Özellikleri
  - Açılır pencere galeri
  - Direk olarak canlı izleme alanı ve açılır pencere galeri
  - İlişkilendirmeli gösterim
  - Destroy (sıfırlama)
  - rebuild (yeniden oluşturma)
  - arrayrebuild (ilişkili galeri yeniden oluşturma)
  - animate.css ile geçiş efektleri

### Kullanımı
Görüntülenmesini istediğin nesnenin ' data-view="true" ' tagına sahip olması gerekmektedir.

#### 1) Include (Canlı izleme) özelliğinde galeri oluşturmak için
```sh
<div class="gallerystyle1" id="gallery1">
    <div class="viewerBox">
        <div class="viewer">
            <img src="resim/buyuk_1.jpg" data-big-img="resim/buyuk_1.jpg" />
        </div>
    </div>
    <ul class="thumbnails">
        <li data-view="true"><figure><img src="resim/kucuk_4.jpg" data-big-img="resim/buyuk_4.jpg" /></figure></li>
        <li data-view="true"><figure><img src="resim/kucuk_5.jpg" data-big-img="resim/buyuk_5.jpg" /></figure></li>
        <li data-view="true"><figure><img src="resim/kucuk_8.jpg" data-big-img="resim/buyuk_8.jpg" /></figure></li>
        <li data-view="true"><figure><img src="resim/kucuk_9.jpg" data-big-img="resim/buyuk_9.jpg" /></figure></li>
    </ul>
</div>
<script>
    $(document).ready(function () {
        $('#gallery1').osGallery({ imgElement: 'li', galleryType: "include" });
    });
</script>
<style>
.gallerystyle1 { border: 2px solid #808080; width: 600px; margin: 0 auto; margin-top: 20px; }
.gallerystyle1 * { list-style: none; }
.gallerystyle1 img { max-width: 100%; }
.gallerystyle1 .viewerBox { width: 100%; height: 380px; display: table; }
.gallerystyle1 .viewerBox .viewer { cursor: pointer; display: table-cell; vertical-align: middle; }
.gallerystyle1 .viewerBox .viewer img { display: block; }
.gallerystyle1 .thumbnails { border-top: 1px solid #808080; }
.gallerystyle1 .thumbnails:after { display: block; content: ""; clear: both; }
.gallerystyle1 .thumbnails li { float: left; height: 80px; width: 20%; box-sizing: border-box; display: table; border-right: 1px solid #808080; border-bottom: 1px solid #808080; }
.gallerystyle1 .thumbnails li figure { display: table-cell; vertical-align: middle; text-align: center; }
.gallerystyle1 .thumbnails li figure img { max-height: 80%; max-width: 80%; margin: 0 auto; }
.gallerystyle1 .thumbnails li:nth-of-type(5n+0) { border-right: 0; }
</style>
```

#### 2) Açılır galeri özelliğinde oluşturmak için
```sh
<section class="gallerystyle2" id="gallery2">
    <div class="item">
        <figure data-view="true">
            <span>
                <img data-title="Resim Açıklama 1" src="resim/buyuk_1.jpg" data-big-img="resim/buyuk_1.jpg" class="grayscale grayscale-fade" />
            </span>
        </figure>
        <figure data-view="true">
            <span>
                <img data-title="Resim Açıklama 1" src="resim/buyuk_2.jpg" data-big-img="resim/buyuk_2.jpg" class="grayscale grayscale-fade" />
            </span>
        </figure>
        <figure data-view="true">
            <span>
                <img data-title="Resim Açıklama 1" src="resim/buyuk_3.jpg" data-big-img="resim/buyuk_3.jpg" class="grayscale grayscale-fade" />
            </span>
        </figure>
        <figure data-view="true">
            <span>
                <img data-title="Resim Açıklama 1" src="resim/buyuk_6.jpg" data-big-img="resim/buyuk_6.jpg" class="grayscale grayscale-fade" />
            </span>
        </figure>
        <figure data-view="true">
            <span>
                <img data-title="Resim Açıklama 1" src="resim/buyuk_7.jpg" data-big-img="resim/buyuk_7.jpg" class="grayscale grayscale-fade" />
            </span>
        </figure>
	</div>
</section>
<script>
    $(document).ready(function () {
        $('#gallery2').osGallery();
    });
</script>
<style>
.gallerystyle2 { display: table; margin: 0 auto; max-width: 800px; padding-top: 20px; }
.gallerystyle2 h3 { display: inline-block; font-size: 22px; color: #222222; text-shadow: 1px 1px #fff; padding: 10px; padding-left: 0; padding-bottom: 20px; position: relative; }
.gallerystyle2 h3:after { content: ""; position: absolute; width: 40%; bottom: 14px; left: 0; background-color: #222222; height: 2px; }
.gallerystyle2:after { content: ""; display: block; clear: both; }
.gallerystyle2 div.item { display: table; border: 1px solid #808080; }
.gallerystyle2 div.item figure { float: left; height: 80px; width: 20%; box-sizing: border-box; display: table; border-right: 1px solid #808080; border-bottom: 1px solid #808080; }
.gallerystyle2 div.item figure span { display: table-cell; vertical-align: middle; text-align: center; }
.gallerystyle2 div.item figure span img { max-height: 79px; max-width: 100%; margin: 0 auto; }
.gallerystyle2 div.item figure:nth-of-type(5n+0) { border-right: 0; }
</style>
```

#### 3) İlişkilendirmeli galeri
İlişkilendirmeli galeri bir amaca yönelik oluşturuldu.
Şu şekilde;
    
    Bir e-ticaret siteniz var.
    Bir ürün eklediniz ve ürününüze 10 tane resim girdiniz.
    Ve ürününüze ait varyantlar mevcut.
    Varyant girip eklediğiniz resimlerden varyanta ait olanları seçiyorsunuz.
    Kullanıcı tarafında varyant seçimi yapan bir kullanıcıya galeride sadece o varyanta özel resimler gösteriliyor.
    (Hiç bir varyanta eklenmeyen resimlerde ortak resim olarak kabul edilir ve gösterilir.)
    
### Versiyon
2.0

### Teknik

jQuery 2.1.4 ( http://www.jquery.com )

Animate.css ( https://daneden.github.io/animate.css )

Gray 1.4.5 ( https://github.com/karlhorky/gray )

### Kurulum

Aşağıdaki kodları < head > tagı içerisine yerleştirin.

```sh
<link href="animate.css" rel="stylesheet" />
<link href="gray.min.css" rel="stylesheet" />
<link href="osGallery.css" rel="stylesheet" />
<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="osGallery.js"></script>
```

Yukarıdaki örnek kodları sitenize entegre edin ve kullanmaya başlayın.

> Teşekkürler. :)

> Oğuzhan SARI

> os@oguzhansari.com

> www.oguzhansari.com
