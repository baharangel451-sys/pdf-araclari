// 8. Sınıf Fen Bilimleri Deneme Sınavı — tek kaynak: sorular + görseller → deneme.html, deneme.pdf, sorular.json
// Çalıştırma: node denemeler/8-sinif-fen-deneme-1/olustur.mjs
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as G from './gorseller.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const HARF = ['A', 'B', 'C', 'D'];

const tablo = (baslik, satirlar, sinif = '') =>
  `<table class="tbl ${sinif}"><thead><tr>${baslik.map((b) => `<th>${b}</th>`).join('')}</tr></thead><tbody>${satirlar
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const el = (s) => `<span class="el">${s}</span>`; // öğrencinin el yazısı

// ---------------------------------------------------------------- SORULAR
const S = [
  // ===================== MEVSİMLER VE İKLİM (4) =====================
  {
    no: 1, unite: 'Mevsimler ve İklim', kazanim: 'F.8.1.1.1', zorluk: 3,
    govde: `<p>Bir güneş enerjisi firmasında çalışan Selin Hanım, çatılara yerleştirilen güneş panellerinin açısının neden önemli olduğunu müşterilerine göstermek için aşağıdaki düzenekleri hazırlamıştır. Düzeneklerde özdeş el fenerleri, kareli kâğıtların ortasına <b>aynı uzaklıktan</b> tutulmuştur. Fenerin ışığı Düzenek 1'de kâğıda dik, Düzenek 2'de ise eğik olarak gönderilmiştir.</p>`,
    gorsel: G.s1(),
    sonra: `<p>Selin Hanım, düzenekler ve çatıdaki panel ile ilgili şu açıklamaları yapmıştır:</p>`,
    maddeler: [
      'Düzeneklerde değiştirilen değişken, ışığın kâğıda geliş açısıdır.',
      'Düzenek 1\'de kâğıdın birim yüzeyine düşen ışık enerjisi, Düzenek 2\'dekinden fazladır.',
      'Panelin, Güneş ışınlarını dike yakın açıyla alacak şekilde yerleştirilmesi panelin birim yüzeyine düşen enerjiyi artırır.',
      'Bu düzeneklerden, Dünya\'nın Güneş\'e olan uzaklığı değiştiği için mevsimlerin oluştuğu sonucuna ulaşılır.',
    ],
    kok: 'Selin Hanım\'ın yaptığı açıklamalardan hangileri doğrudur?',
    secenekler: ['I, II ve III', 'I, III ve IV', 'II, III ve IV', 'I, II, III ve IV'], secDuzen: 4, cevap: 0,
    aciklama: 'Fenerlerin uzaklığı sabit, yalnızca geliş açısı değişmiştir. Dik gelen ışık daha küçük alana yayılır; birim yüzeye düşen enerji fazladır. Düzenekte uzaklık değişmediği için IV yanlıştır.',
  },
  {
    no: 2, unite: 'Mevsimler ve İklim', kazanim: 'F.8.1.1.1', zorluk: 3,
    govde: `<p>Aşağıdaki görselde Dünya'nın Güneş etrafında dolanırken bulunduğu dört farklı konum K, L, M ve N harfleriyle gösterilmiştir. Dünya'nın dönme ekseninin eğikliği ve yönü her konumda aynıdır.</p>`,
    gorsel: G.s2(),
    sonra: `<p>Kuzey Yarım Küre'deki Ankara'da yaşayan Ece ile Güney Yarım Küre'deki Santiago'da (Şili) yaşayan Lucas, aynı gün görüntülü konuşma yapmıştır.</p>
      <div class="konusma"><div class="balon"><b>Ece:</b> Bugün yılın en uzun gündüzünü yaşadık. Yarından itibaren gündüzler kısalmaya başlayacak.</div>
      <div class="balon sag"><b>Lucas:</b> Burada ise hava soğuk. Akşam da çok erken karardı.</div></div>`,
    kok: 'Görsel ve konuşma birlikte değerlendirildiğinde aşağıdakilerden hangisi <u>doğrudur</u>?',
    secenekler: [
      'Konuşmanın yapıldığı gün Dünya M konumundadır.',
      'Dünya K konumundan L konumuna ilerlerken Santiago\'da gündüz süreleri uzar.',
      'Dünya L konumundayken Ankara\'ya öğle vakti Güneş ışınları yılın en dik açısıyla gelir.',
      'Konuşmanın yapıldığı gün Santiago\'da yaz mevsimi başlar.',
    ], secDuzen: 1, cevap: 1,
    aciklama: 'Ece\'nin ifadesi 21 Haziran\'ı gösterir; Kuzey Kutbu\'nun Güneş\'e yöneldiği konum K\'dir. K\'den L\'ye (23 Eylül) giderken Güney Yarım Küre\'de gündüzler uzar.',
  },
  {
    no: 3, unite: 'Mevsimler ve İklim', kazanim: 'F.8.1.2.1 – F.8.1.2.2', zorluk: 3,
    govde: `<p>Kerem, gazete ve haber sitelerinden derlediği ifadeleri aşağıdaki tabloda sınıflandırmıştır. Kerem her ifadenin <b>hava olayı</b> mı yoksa <b>iklim</b> mi olduğunu ve bu konuyu inceleyen uzmanı tabloya yazmıştır.</p>
      ${tablo(['', 'İfade', 'Türü', 'İnceleyen uzman'], [
        [`<b>1</b>${G.simge.yagmur}`, 'Yarın Karadeniz kıyılarında öğle saatlerinden itibaren kuvvetli sağanak yağış bekleniyor.', el('Hava olayı'), el('Meteorolog')],
        [`<b>2</b>${G.simge.cay}`, 'Rize\'de yılın büyük bölümü yağışlı geçtiği ve kışlar çok soğuk olmadığı için çay tarımı yapılabilmektedir.', el('Hava olayı'), el('Klimatolog')],
        [`<b>3</b>${G.simge.grafik}`, 'Uzun yıllara ait kayıtlar, ülkemizde kurak geçen dönemlerin giderek uzadığını gösteriyor.', el('İklim'), el('Meteorolog')],
        [`<b>4</b>${G.simge.sis}`, 'Bu sabah Erzurum\'da etkili olan yoğun sis nedeniyle bazı uçak seferleri ertelendi.', el('Hava olayı'), el('Meteorolog')],
        [`<b>5</b>${G.simge.sera}`, 'Antalya\'da kışların genellikle ılık geçmesi seracılığın yaygınlaşmasını sağlamıştır.', el('İklim'), el('Klimatolog')],
      ], 'siniflama')}`,
    kok: 'Buna göre Kerem, tablonun hangi satırlarında <u>hata</u> yapmıştır?',
    secenekler: ['1 ve 2', '1 ve 4', '2 ve 3', '3 ve 5'], secDuzen: 4, cevap: 2,
    aciklama: '2. ifade uzun süreli ortalama koşulları anlatır (iklim). 3. ifade iklim ile ilgilidir ancak uzun yıllık verileri inceleyen uzman klimatologdur.',
  },
  {
    no: 4, unite: 'Mevsimler ve İklim', kazanim: 'F.8.1.2.1 – F.8.1.2.2', zorluk: 3,
    govde: `<p>Bir iklim bilimci, dağlardaki buzulların değişimini incelemek için bir bölgeye ait uzun yıllar boyunca toplanmış ortalama sıcaklık ve buzul alanı verilerini grafiğe dönüştürmüştür. Ayrıca aynı buzulun geçmişte ve günümüzde çekilmiş fotoğraflarını karşılaştırmıştır.</p>`,
    gorsel: G.s4(),
    sonra: `<p>Bu çalışmayı inceleyen öğrenciler şu yorumları yapmıştır:</p>`,
    maddeler: [
      'Sıcaklığın bazı yıllarda bir önceki yıla göre düşmüş olması, bölgede uzun dönemde bir ısınma olmadığını gösterir.',
      'Buzul alanının küçülmesi, uzun dönemde görülen sıcaklık artışıyla ilişkilendirilebilir.',
      'Uzun yıllara ait verilerin incelenmesi, bu çalışmanın klimatolojinin ilgi alanında olduğunu gösterir.',
      'Bölgede bir kış mevsiminin çok soğuk ve kar yağışlı geçmesi, küresel iklim değişikliğinin sona erdiğini kanıtlar.',
    ],
    kok: 'Öğrencilerin yorumlarından hangileri bilimsel olarak doğrudur?',
    secenekler: ['I ve II', 'II ve III', 'III ve IV', 'I, II ve III'], secDuzen: 4, cevap: 1,
    aciklama: 'İklim uzun dönem ortalamalarla değerlendirilir; tek tek yıllardaki dalgalanmalar ya da tek bir mevsim, uzun dönemli eğilimi çürütmez.',
  },

  // ===================== DNA VE GENETİK KOD (10) =====================
  {
    no: 5, unite: 'DNA ve Genetik Kod', kazanim: 'F.8.2.1.1', zorluk: 3,
    govde: `<p>Fen bilimleri öğretmeni, kalıtsal yapılar arasındaki ilişkiyi anlatmak için okul kütüphanesini model olarak kullanmış ve aşağıdaki eşleştirmeleri yapmıştır.</p>
      ${tablo(['Modeldeki yapı', 'Hücredeki karşılığı'], [
        ['Kütüphane', 'Hücre çekirdeği'],
        ['Raflardaki kitapların her biri', 'Kromozom'],
        ['Bir kitabın kapağı ve cildi', 'DNA\'yı saran özel proteinler'],
        ['Bir kitaptaki yazıların tamamı', 'DNA'],
        ['Kitapta belirli bir konuyu anlatan bölüm', 'Gen'],
        ['Yazıları oluşturan harfler', 'Nükleotit'],
      ], 'model')}`,
    gorsel: G.s5(),
    sonra: `<p>Öğrenciler bu modelden yola çıkarak şu çıkarımları yapmıştır:</p>`,
    maddeler: [
      'Bir kromozomda farklı özellikleri belirleyen çok sayıda gen bulunabilir.',
      'Genler, DNA\'yı oluşturan nükleotitlerin belirli bir sırayla dizilmesiyle oluşur.',
      'Harflerin sırası değişince cümlenin anlamı değişebileceği gibi nükleotitlerin diziliş sırasındaki bir değişiklik de canlının bir özelliğini değiştirebilir.',
      'Kitap sayısı fazla olan bir kütüphanenin daha zengin olması gibi kromozom sayısı fazla olan bir canlı da daha gelişmiştir.',
    ],
    kok: 'Bu çıkarımlardan hangileri hem modelle hem de bilimsel bilgilerle <u>uyumludur</u>?',
    secenekler: ['I ve II', 'I ve IV', 'II ve IV', 'I, II ve III'], secDuzen: 4, cevap: 3,
    aciklama: 'Kromozom sayısı ile canlının gelişmişliği arasında bir ilişki yoktur; diğer çıkarımlar nükleotit → gen → DNA → kromozom ilişkisine uygundur.',
  },
  {
    no: 6, unite: 'DNA ve Genetik Kod', kazanim: 'F.8.2.1.2', zorluk: 3,
    govde: `<p>Okuldaki bilim şenliği için Can, renkli kil ve pipetler kullanarak bir DNA modeli hazırlamıştır. Can'ın modeli ve kullandığı malzemelerin anlamı aşağıda verilmiştir.</p>`,
    gorsel: G.s6(),
    sonra: `<p>Fen bilimleri öğretmeni, modelde bir hata olduğunu belirtmiş ve şu açıklamaları yapmıştır:</p>`,
    maddeler: [
      'Hata, 3. basamakta karşılıklı gelen bazların yanlış seçilmesidir; timinin karşısına adenin gelmeliydi.',
      'Modelde her nükleotit bir fosfat, bir deoksiriboz şekeri ve bir organik bazdan oluşacak şekilde gösterilmiştir.',
      'Canlıların DNA\'sında da buna benzer eşleşme hataları oluşabilir ve bu hataların bir kısmı hücre tarafından onarılabilir.',
      'Model düzeltildiğinde iki zincirdeki bazların diziliş sırası birbirinin aynısı olur.',
    ],
    kok: 'Öğretmenin açıklamalarından hangileri doğrudur?',
    secenekler: ['I ve IV', 'II ve III', 'I, II ve III', 'II, III ve IV'], secDuzen: 2, cevap: 2,
    aciklama: 'DNA\'da adenin timinle, guanin sitozinle eşleşir. İki zincir birbirinin aynısı değil tamamlayıcısıdır. DNA\'daki hataların bir kısmı onarılabilir.',
  },
  {
    no: 7, unite: 'DNA ve Genetik Kod', kazanim: 'F.8.2.1.3', zorluk: 3,
    govde: `<p>Dizini yere sürterek yaralayan Elif, birkaç gün sonra yarasının kapandığını fark etmiştir. Yaranın iyileşmesi sırasında deri hücreleri bölünerek çoğalmıştır. Hücre bölünmeden önce çekirdekteki DNA kendini eşler. Aşağıda bu olayın bir bölümü modellenmiştir.</p>`,
    gorsel: G.s7(),
    kok: 'Buna göre DNA\'nın kendini eşlemesiyle ilgili aşağıdakilerden hangisi <u>yanlıştır</u>?',
    secenekler: [
      'Oluşan DNA moleküllerinin her birinde başlangıçtaki DNA\'ya ait bir zincir bulunur.',
      'Yeni zincirler, hücrede serbest hâlde bulunan nükleotitler kullanılarak oluşturulur.',
      'Eşlenme hatasız gerçekleşirse yeni hücreler, bölünen hücreyle aynı kalıtsal bilgiye sahip olur.',
      'Açılan zincirlerin karşısına, o zincirdeki nükleotitlerin aynısı olan nükleotitler yerleşir.',
    ], secDuzen: 1, cevap: 3,
    aciklama: 'Açılan zincirin karşısına tamamlayıcı nükleotitler gelir (A–T, G–C). Bu nedenle yeni zincir, kalıp zincirin aynısı değil tamamlayıcısıdır.',
  },
  {
    no: 8, unite: 'DNA ve Genetik Kod', kazanim: 'F.8.2.2.1', zorluk: 3,
    govde: `<p>Aşağıdaki tabloda bezelyelerde üç karakterin baskın ve çekinik özellikleri ile bunları belirleyen genlerin sembolleri verilmiştir.</p>
      ${tablo(['Karakter', 'Baskın özellik', 'Çekinik özellik'], [
        ['Bitki boyu', 'Uzun (U)', 'Kısa (u)'],
        ['Çiçek rengi', 'Mor (M)', 'Beyaz (m)'],
        ['Tohum rengi', 'Sarı (S)', 'Yeşil (s)'],
      ], 'dar')}
      <p>Bir araştırmacı, bahçesindeki bir bezelye bitkisinin bu karakterlere ait genotiplerini belirleyerek bitkinin üzerine etiketlemiştir.</p>`,
    gorsel: G.s8(),
    maddeler: [
      'Bitki, boy karakteri bakımından melez döldür ve uzun boyludur.',
      'Bitki, çiçek rengi bakımından saf döldür ve çekinik özelliği gösterir.',
      'Tohum rengi bakımından, yalnızca fenotipe bakılarak bu bitkinin genotipi kesin olarak belirlenebilir.',
      'Bitki kendi polenleriyle tozlaşırsa oluşan yeni bitkilerin tamamı beyaz çiçekli olur.',
    ],
    kok: 'Etiketlerdeki bilgilere göre bu bitkiyle ilgili ifadelerden hangileri doğrudur?',
    secenekler: ['I, II ve IV', 'I, III ve IV', 'II, III ve IV', 'I, II, III ve IV'], secDuzen: 2, cevap: 0,
    aciklama: 'Sarı tohum fenotipi SS ya da Ss genotipinden oluşabilir; bu nedenle yalnız fenotipe bakarak genotip kesin belirlenemez.',
  },
  {
    no: 9, unite: 'DNA ve Genetik Kod', kazanim: 'F.8.2.2.2', zorluk: 3,
    govde: `<p>Bir tohum firması, tohum rengi bakımından yalnızca saf döl olan sarı tohumlu bezelyeleri satışa sunmak istemektedir. Bu amaçla fenotipi sarı tohumlu olan X ve Y bezelyelerini, yeşil tohumlu bezelyelerle ayrı ayrı çaprazlamış ve aşağıdaki sonuçları elde etmiştir.</p>`,
    gorsel: G.s9(),
    kok: 'Bu çaprazlamalarla ilgili aşağıdakilerden hangisi <u>yanlıştır</u>?',
    secenekler: [
      'Sarı tohum rengi, yeşil tohum rengine baskındır.',
      'Firmanın saf döl olarak satabileceği bezelye X\'tir.',
      'Deney 2\'de oluşan yeşil tohumlu bezelyeler melez döldür.',
      'X ile Y çaprazlanırsa oluşan bezelyelerin hepsi sarı tohumlu olur.',
    ], secDuzen: 1, cevap: 2,
    aciklama: 'Yeşil tohum çekinik özelliktir; çekinik özellik yalnızca iki çekinik gen bir araya geldiğinde (ss) görülür. Bu nedenle yeşil tohumlu bezelyeler saf döldür.',
  },
  {
    no: 10, unite: 'DNA ve Genetik Kod', kazanim: 'F.8.2.2.2', zorluk: 2,
    govde: `<p>Üç kız çocuğu olan Yıldız ailesi, dördüncü çocuklarını beklemektedir. Bir akşam yemeğinde aile bireyleri ve misafir olarak gelen komşuları, doğacak bebeğin cinsiyetiyle ilgili şu görüşleri dile getirmiştir.</p>
      <div class="kisiler">
        <div class="kisi">${G.avatar('babaanne')}<div><b>Babaanne:</b> Gelinim hep kız doğurdu. Demek ki çocuğun cinsiyetini belirleyen annedir.</div></div>
        <div class="kisi">${G.avatar('komsu')}<div><b>Komşu:</b> Üç kızdan sonra dördüncü çocuğun erkek olması kesindir.</div></div>
        <div class="kisi">${G.avatar('baba')}<div><b>Baba:</b> Çocuğun cinsiyeti, benden gelen üreme hücresinin taşıdığı eşey kromozomuyla belirlenir.</div></div>
        <div class="kisi">${G.avatar('ayse')}<div><b>Ayşe:</b> Annemin yumurta hücrelerinin hepsi aynı tür eşey kromozomu taşır. Bu yüzden cinsiyeti annem belirleyemez.</div></div>
      </div>`,
    kok: 'Buna göre hangi kişilerin görüşleri bilimsel bilgilerle <u>uyumludur</u>?',
    secenekler: ['Babaanne ve Baba', 'Baba ve Ayşe', 'Komşu ve Ayşe', 'Babaanne, Baba ve Ayşe'], secDuzen: 2, cevap: 1,
    aciklama: 'Yumurta hücrelerinin hepsi X taşır; sperm hücreleri X ya da Y taşır. Cinsiyeti babadan gelen eşey kromozomu belirler. Önceki doğumlar sonraki çocuğun cinsiyetini etkilemez.',
  },
  {
    no: 11, unite: 'DNA ve Genetik Kod', kazanim: 'F.8.2.2.3', zorluk: 3,
    govde: `<p>Kalıtsal bir hastalığı olan bir çocuğun ailesi genetik danışmanlık merkezine başvurmuştur. Uzmanlar ailenin soy ağacını aşağıdaki gibi çıkarmış ve hasta çocuğun anne ile babasının kuzen olduğunu belirlemiştir.</p>`,
    gorsel: G.s11(),
    maddeler: [
      'Hastalık, çekinik bir genle ortaya çıkmaktadır.',
      'Hasta çocuğun anne ve babası, hastalık genini taşıdıkları hâlde hasta değildir.',
      'Anne ve babanın akraba olması, aynı çekinik geni taşıma olasılıklarını artırmıştır.',
      'Bu ailede hastalığa neden olan gen yalnızca hasta çocukta bulunur.',
    ],
    kok: 'Soy ağacına göre yukarıdaki ifadelerden hangileri doğrudur?',
    secenekler: ['I ve II', 'II ve IV', 'III ve IV', 'I, II ve III'], secDuzen: 2, cevap: 3,
    aciklama: 'Sağlıklı anne-babadan hasta çocuk doğduğu için hastalık geni çekiniktir ve anne-baba taşıyıcıdır. Akrabalar ortak atalardan gelen aynı çekinik geni taşıyabilir.',
  },
  {
    no: 12, unite: 'DNA ve Genetik Kod', kazanim: 'F.8.2.3.3', zorluk: 3,
    govde: `<p>Zeynep, mutasyon ve modifikasyon konusunu tekrar ederken bazı olayları aşağıdaki tabloda değerlendirmiştir.</p>
      ${tablo(['', 'Olay', 'Genlerin yapısı değişir mi?', 'Yavrulara aktarılır mı?'], [
        [`<b>K</b>${G.simge.gunes}`, 'Güneş ışınlarına uzun süre korunmasız kalan bir kişinin deri hücrelerinde kalıcı bir değişiklik oluşması', el('Evet'), el('Hayır')],
        [`<b>L</b>${G.simge.ari}`, 'Larva döneminde arı sütüyle beslenen dişi arının kraliçe arı olması', el('Hayır'), el('Evet')],
        [`<b>M</b>${G.simge.radyasyon}`, 'Radyasyona maruz kalan bir bitkinin üreme hücrelerinde oluşan değişikliğin yeni bitkilerde görülmesi', el('Evet'), el('Evet')],
        [`<b>N</b>${G.simge.dambil}`, 'Düzenli spor yapan bir kişinin kaslarının gelişmesi', el('Evet'), el('Hayır')],
      ], 'siniflama')}`,
    kok: 'Buna göre Zeynep\'in hangi olaylarla ilgili değerlendirmeleri <u>hatalıdır</u>?',
    secenekler: ['Yalnız N', 'L ve N', 'K ve M', 'K, L ve N'], secDuzen: 4, cevap: 1,
    aciklama: 'L ve N modifikasyondur: genlerin yapısı değişmez, yavrulara aktarılmaz. K vücut hücresinde oluşan mutasyondur; yavrulara aktarılmaz. M üreme hücresinde oluşan mutasyondur.',
  },
  {
    no: 13, unite: 'DNA ve Genetik Kod', kazanim: 'F.8.2.4.1', zorluk: 3,
    govde: `<p>Çöl tilkisi, gündüzleri çok sıcak olan çöllerde; kutup tilkisi ise yılın büyük bölümünde karla kaplı soğuk bölgelerde yaşar. Çöl tilkisinin kulakları vücuduna göre oldukça büyük, tüyleri ince ve kum rengindedir. Kutup tilkisinin kulakları küçük ve yuvarlak, tüyleri ise kalın ve beyazdır.</p>`,
    gorsel: G.s13(),
    maddeler: [
      'Çöl tilkisinin büyük kulakları, vücut ısısını çevreye vermesini kolaylaştırarak serinlemesine yardımcı olur.',
      'Kutup tilkisinin kalın tüyleri ve küçük kulakları, vücut ısısının kaybını azaltır.',
      'Bir kutup tilkisi çöle götürülürse kulakları zamanla büyür ve bu özellik yavrularına aktarılır.',
      'Ortama uygun özelliklere sahip bireylerin hayatta kalma ve üreme şansı daha yüksek olduğundan bu kalıtsal özellikler nesiller boyunca yaygınlaşmıştır.',
    ],
    kok: 'Bu tilkilerin sahip olduğu özelliklerle ilgili ifadelerden hangileri doğrudur?',
    secenekler: ['I, II ve IV', 'I, III ve IV', 'II, III ve IV', 'I, II, III ve IV'], secDuzen: 2, cevap: 0,
    aciklama: 'Adaptasyonlar kalıtsaldır; canlının yaşamı boyunca ortama göre kazandığı değişiklikler yavrulara aktarılmaz. Ortama uygun bireylerin seçilmesi doğal seçilimdir.',
  },
  {
    no: 14, unite: 'DNA ve Genetik Kod', kazanim: 'F.8.2.5.1 – F.8.2.5.2', zorluk: 3,
    govde: `<p>Aşağıda biyoteknoloji alanındaki çalışmalarla ilgili dört haber verilmiştir.</p>
      <div class="haberler">
        <div class="haber"><div class="hb">${G.simge.bugday}<span>1. Haber</span></div>Kuraklığa dayanıklı bir bitkiden alınan gen buğdaya aktarıldı. Yeni buğday daha az suyla yetişebiliyor.</div>
        <div class="haber"><div class="hb">${G.simge.keci}<span>2. Haber</span></div>Nesli tükenmek üzere olan bir yaban keçisinin vücut hücresinden alınan çekirdekle, bu keçiyle aynı kalıtsal özelliklere sahip bir yavru elde edildi.</div>
        <div class="haber"><div class="hb">${G.simge.goz}<span>3. Haber</span></div>Kalıtsal bir göz hastalığı olan kişilerin göz hücrelerine, hastalığa neden olan genin sağlam kopyası aktarıldı.</div>
        <div class="haber"><div class="hb">${G.simge.inek}<span>4. Haber</span></div>Süt verimi yüksek inekler seçilerek nesiller boyunca birbiriyle çiftleştirildi ve süt verimi yüksek yeni bir ırk elde edildi.</div>
      </div>`,
    kok: 'Bu haberlerle ilgili aşağıdakilerden hangisi <u>yanlıştır</u>?',
    secenekler: [
      '1. haberde elde edilen buğdayın doğaya ve diğer canlılara olası etkileri uzun süre araştırılmalıdır.',
      '2. haberde elde edilen yavrunun kalıtsal özellikleri, hücre çekirdeğinin alındığı keçiyle aynıdır.',
      '3. haberdeki uygulama gen tedavisine örnektir.',
      '4. haberde ineklerin genleri laboratuvarda doğrudan değiştirildiği için bu uygulama gen aktarımına örnektir.',
    ], secDuzen: 1, cevap: 3,
    aciklama: '4. haberdeki uygulama ıslahtır (yapay seçilim): istenen özellikteki canlılar seçilerek çiftleştirilir; genlere doğrudan müdahale edilmez.',
  },

  // ===================== BASINÇ (6) =====================
  {
    no: 15, unite: 'Basınç', kazanim: 'F.8.3.1.1', zorluk: 3,
    govde: `<p>Kayak merkezine giden Efe, kar raketlerinin karda yürümeyi neden kolaylaştırdığını merak etmiştir. Efe, aynı kar alanında dört farklı durumda yürüyerek oluşan izlerin derinliklerini incelemiştir. Kar botları birbirinin aynısı, kar raketleri de birbirinin aynısıdır.</p>`,
    gorsel: G.s15(),
    maddeler: [
      'K ve L\'deki izler karşılaştırılarak katı basıncının yüzey alanına bağlı olduğu gösterilebilir.',
      'L ve N\'deki izler karşılaştırılarak katı basıncının ağırlığa bağlı olduğu gösterilebilir.',
      'M ve N\'deki iz derinliklerinin farklı olması, kara temas eden yüzey alanlarının farklı olmasından kaynaklanır.',
      'K ve N\'deki izler karşılaştırıldığında, yüzey alanı aynı iken ağırlık arttıkça katı basıncının arttığı görülür.',
    ],
    kok: 'Buna göre Efe\'nin yaptığı çıkarımlardan hangileri doğrudur?',
    secenekler: ['I ve II', 'II ve IV', 'I, III ve IV', 'I, II, III ve IV'], secDuzen: 4, cevap: 2,
    aciklama: 'L ve N\'de hem yüzey alanı hem ağırlık değiştiği için hangi değişkenin etkili olduğu anlaşılamaz. Diğer karşılaştırmalarda yalnızca bir değişken değişmiştir.',
  },
  {
    no: 16, unite: 'Basınç', kazanim: 'F.8.3.1.2', zorluk: 3,
    govde: `<p>Defne, U borulu basınç ölçerin hortumuna bağlı ve ağzı lastik zarla kapatılmış bir huniyi sıvıların içine yerleştirerek dört deney yapmıştır. U borusundaki sıvı seviyeleri arasındaki fark ne kadar büyükse huninin bulunduğu yerdeki sıvı basıncı o kadar büyüktür. Deney 2, 3 ve 4'te huni, sıvı yüzeyinden aynı derinliktedir.</p>`,
    gorsel: G.s16(),
    maddeler: [
      'Deney 1 ve 2\'ye göre derinlik arttıkça sıvı basıncı artar.',
      'Deney 2 ve 4\'e göre sıvı basıncı kabın genişliğine bağlı değildir.',
      'Deney 2 ve 3\'e göre sıvı basıncı sıvının cinsine bağlı değildir.',
      'Barajların duvarlarının tabana doğru kalınlaştırılması, Deney 1 ve 2\'den elde edilen sonuçla açıklanabilir.',
    ],
    kok: 'Buna göre Defne\'nin yaptığı çıkarımlardan hangileri doğrudur?',
    secenekler: ['I ve II', 'I, II ve IV', 'II, III ve IV', 'I, II, III ve IV'], secDuzen: 4, cevap: 1,
    aciklama: 'Aynı derinlikte zeytinyağında seviye farkı sudakinden azdır; sıvı basıncı sıvının cinsine (yoğunluğuna) bağlıdır. Kap genişliği basıncı değiştirmez.',
  },
  {
    no: 17, unite: 'Basınç', kazanim: 'F.8.3.1.2 – F.8.3.1.3', zorluk: 3,
    govde: `<p>Antalya'da deniz kenarında yaşayan Mert, ailesiyle Toros Dağları'ndaki bir yaylaya gitmiştir. Yanına aldığı ağzı kapalı cips paketinin yaylada şiştiğini fark etmiştir. Mert yaylada boş bir pet şişenin kapağını sıkıca kapatmış, sahile döndüklerinde ise şişenin büzüldüğünü görmüştür.</p>`,
    gorsel: G.s17(),
    maddeler: [
      'Paketin yaylada şişmesi, yaylada açık hava basıncının sahile göre daha az olmasından kaynaklanır.',
      'Şişenin sahilde büzülmesi, dışarıdaki hava basıncının şişenin içindeki hava basıncından büyük olmasından kaynaklanır.',
      'Yolculuk boyunca paketin içindeki hava miktarı artmıştır.',
      'Kapağı sahilde kapatılan bir şişe yaylaya götürülseydi şişe büzülürdü.',
    ],
    kok: 'Mert\'in gözlemleriyle ilgili ifadelerden hangileri doğrudur?',
    secenekler: ['I ve II', 'II ve III', 'I, II ve IV', 'II, III ve IV'], secDuzen: 4, cevap: 0,
    aciklama: 'Kapalı paket ve şişedeki hava miktarı değişmez. Yükseklere çıkıldıkça açık hava basıncı azalır; sahilde kapatılan şişe yaylada büzülmez.',
  },
  {
    no: 18, unite: 'Basınç', kazanim: 'F.8.3.1.3', zorluk: 3,
    govde: `<p>Bir oto servisinde arabaları kaldırmak için kullanılan hidrolik kaldıraç aşağıda modellenmiştir. Bu sistem, bilimsel bilgi türlerinden biri olan <b>Pascal prensibine</b> göre çalışır.</p>`,
    gorsel: G.s18(),
    maddeler: [
      'Küçük pistona uygulanan basınç, sıvı tarafından büyük pistona aynen iletilir.',
      'Sıvının büyük pistona uyguladığı basınç, küçük pistona uygulanan basınçtan büyüktür.',
      'Küçük pistona uygulanan kuvvetten daha büyük bir kuvvet, büyük pistonda elde edilir.',
      'Berber koltukları ve iş makinelerindeki kepçeler de bu sistemle aynı prensiple çalışır.',
    ],
    kok: 'Hidrolik kaldıraçla ilgili verilen ifadelerden hangileri doğrudur?',
    secenekler: ['I ve II', 'II ve III', 'I, III ve IV', 'II, III ve IV'], secDuzen: 4, cevap: 2,
    aciklama: 'Kapalı kaptaki sıvıya uygulanan basınç her yöne aynen iletilir; iki pistondaki basınç eşittir. Büyük pistonun yüzey alanı büyük olduğu için daha büyük kuvvet elde edilir.',
  },
  {
    no: 19, unite: 'Basınç', kazanim: 'F.8.3.1.3', zorluk: 3, tamGenislik: true,
    govde: `<p>Fen bilimleri öğretmeni, basıncın günlük hayattaki uygulamalarıyla ilgili "Basınç Rallisi" adlı bir etkinlik hazırlamıştır. Öğrenciler 1. kutudan başlayarak her kutudaki ifade doğru ise <b class="d">D</b>, yanlış ise <b class="y">Y</b> okunu takip etmektedir.</p>`,
    gorsel: G.s19([
      'Bıçakların kesici kısımlarının ince yapılması, yüzey alanını azaltarak uygulanan basıncı artırır.',
      'Vantuzun cama yapışması, vantuzun içindeki hava basıncının dışarıdaki açık hava basıncından büyük olmasıyla açıklanır.',
      'Su kulelerinin yerleşim yerlerinden daha yüksek noktalara kurulması, sıvı basıncının derinlikle değişmesine dayanır.',
      'Pipetle meyve suyu içerken sıvıyı pipette yukarı doğru iten, açık hava basıncıdır.',
      'Arabaların hidrolik fren sistemi, sıvıların üzerlerine uygulanan basıncı her yöne aynen iletmesi prensibiyle çalışır.',
      'Develerin geniş tabanlı ayakları, kuma uyguladıkları basıncı azaltır.',
      'Dalgıçların derinlere indikçe daha dayanıklı kıyafetler giymesi, sıvı basıncının derinlikle azalmasından kaynaklanır.',
    ]),
    kok: 'Buna göre tüm ifadeleri doğru değerlendiren bir öğrenci hangi çıkışa ulaşır?',
    secenekler: ['3', '4', '5', '7'], secDuzen: 4, cevap: 0,
    aciklama: '1. ifade doğru (D) → 2. ifade yanlış (Y), çünkü vantuzun içindeki basınç dışarıdakinden küçüktür → 5. ifade doğru (D) → 3. çıkış.',
  },
  {
    no: 20, unite: 'Basınç', kazanim: 'F.8.3.1.2 – F.8.3.1.3', zorluk: 3,
    govde: `<p>Bir apartmanın çatısındaki su deposundan dairelere su, aşağıdaki gibi borularla ulaştırılmaktadır. Apartmanda yaşayanlar, zemin kattaki musluklardan suyun en üst kattakilere göre daha basınçlı aktığını fark etmiştir.</p>`,
    gorsel: G.s20(),
    maddeler: [
      'Zemin kattaki musluktan suyun daha basınçlı akması, bu musluğun depodaki su yüzeyinden daha derinde olmasından kaynaklanır.',
      'Depodaki su seviyesi azaldıkça musluklardan akan suyun basıncı azalır.',
      'En üst kattaki musluktan suyun daha basınçlı akması için depoyu, su seviyesi aynı kalacak şekilde tabanı daha geniş bir depoyla değiştirmek yeterlidir.',
      'Deponun daha yüksek bir noktaya taşınması, bütün musluklardaki su basıncını artırır.',
    ],
    kok: 'Apartmandaki su sistemiyle ilgili ifadelerden hangileri doğrudur?',
    secenekler: ['I ve II', 'II ve III', 'I, III ve IV', 'I, II ve IV'], secDuzen: 2, cevap: 3,
    aciklama: 'Sıvı basıncı, sıvı yüzeyinden olan derinliğe bağlıdır; kabın genişliğine bağlı değildir.',
  },
];

// Sayfa yerleşimine uyması için ünite içindeki sıra: eski no → yeni sıra
const SIRA = [1, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 17, 18, 19];
S.sort((a, b) => SIRA.indexOf(a.no) - SIRA.indexOf(b.no));
S.forEach((q, i) => { q.no = i + 1; });

// ---------------------------------------------------------------- SAYFA DÜZENİ
// Her sayfa: bloklar listesi. {tam: no} tam genişlik, {sol:[..], sag:[..]} iki sütun
const SAYFALAR = [
  [{ tam: 1 }, { tam: 2 }],
  [{ tam: 3 }, { tam: 4 }],
  [{ tam: 5 }, { yan: 6 }],
  [{ yan: 7 }, { yan: 8 }],
  [{ yan: 9 }, { tam: 10 }, { yan: 11 }],
  [{ tam: 12 }, { tam: 13 }],
  [{ tam: 14 }, { tam: 15 }],
  [{ tam: 16 }, { yan: 17 }],
  [{ tam: 18 }, { yan: 19 }],
  [{ tam: 20 }],
];

const ROMA = ['I', 'II', 'III', 'IV', 'V'];
function soruHTML(q, gorunenNo, yan = false) {
  const sec = q.secenekler.map((s, i) => `<div class="sec"><b>${HARF[i]})</b> ${s}</div>`).join('');
  const madde = q.maddeler ? `<ol class="maddeler">${q.maddeler.map((m, i) => `<li><span class="r">${ROMA[i]}.</span><span>${m}</span></li>`).join('')}</ol>` : '';
  const gor = q.gorsel ? `<div class="gorsel-kutu">${q.gorsel}</div>` : '';
  const govde = yan && q.gorsel
    ? `<div class="yan-izgara"><div>${q.govde ?? ''}${q.sonra ?? ''}${madde}</div>${gor}</div>`
    : `${q.govde ?? ''}${gor}${q.sonra ?? ''}${madde}`;
  return `<section class="soru${yan ? ' yan' : ''}" id="s${gorunenNo}"><div class="no">${gorunenNo}.</div><div class="icerik">
    ${govde}
    <p class="kok">${q.kok}</p>
    <div class="secenekler d${q.secDuzen}">${sec}</div>
  </div></section>`;
}

const CSS = `
@page { size: A4; margin: 0 }
* { box-sizing: border-box }
:root { --lacivert:#13294b; --vurgu:#0f766e; --cizgi:#cbd5e1 }
html, body { margin:0; padding:0; background:#fff }
body { font-family: 'Inter', 'Liberation Sans', sans-serif; color:#111827; font-size:9.4pt; line-height:1.36; -webkit-print-color-adjust:exact; print-color-adjust:exact }
.sayfa { width:210mm; height:297mm; padding:9mm 10mm 13mm; position:relative; overflow:hidden; page-break-after:always; display:flex; flex-direction:column }
.sayfa:last-child { page-break-after:auto }
.sayfa > * { flex:none }
.yan-izgara { display:grid; grid-template-columns: 1fr 44%; gap:5mm; align-items:start }
.yan-izgara .gorsel-kutu { margin:0 }
.yan .secenekler.d4 { grid-template-columns:repeat(4,1fr) }
.ust-serit { display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid var(--lacivert); padding-bottom:2.2mm; margin-bottom:3.5mm }
.ust-serit .sol { font-weight:800; color:var(--lacivert); letter-spacing:.3px; font-size:10pt }
.ust-serit .sag { font-size:8.5pt; color:#475569; font-weight:600 }
.kapak { background:linear-gradient(115deg,#13294b 0%,#1d4f7a 55%,#0f766e 100%); color:#fff; border-radius:4mm; padding:4.5mm 6mm; display:flex; justify-content:space-between; align-items:center; margin-bottom:3mm; position:relative; overflow:hidden }
.kapak:after { content:''; position:absolute; right:-18mm; top:-22mm; width:60mm; height:60mm; border-radius:50%; background:rgba(255,255,255,.07) }
.kapak h1 { margin:0; font-size:19pt; letter-spacing:.5px; font-weight:800 }
.kapak .alt { font-size:9.5pt; opacity:.9; margin-top:1mm; font-weight:500 }
.kapak .rozet { background:#fff; color:var(--lacivert); border-radius:3mm; padding:2mm 4mm; text-align:center; font-weight:800; line-height:1.05; z-index:1 }
.kapak .rozet .b { font-size:22pt } .kapak .rozet .k { font-size:8pt; letter-spacing:1px }
.bilgi { display:grid; grid-template-columns: 2fr 2fr 1fr 1fr; gap:3mm; font-size:8.8pt; margin-bottom:2.5mm }
.bilgi div { border-bottom:1px solid #94a3b8; padding:1mm 0; color:#334155; font-weight:600 }
.yonerge { background:#f1f5f9; border-left:3px solid var(--vurgu); padding:1.6mm 3mm; font-size:8.6pt; color:#334155; margin-bottom:3.5mm; border-radius:1.5mm }
.alt-serit { position:absolute; left:10mm; right:10mm; bottom:6mm; display:flex; justify-content:space-between; font-size:8pt; color:#64748b; border-top:1px solid var(--cizgi); padding-top:1.6mm }
.alt-serit .sn { background:var(--lacivert); color:#fff; border-radius:50%; width:6.2mm; height:6.2mm; display:inline-flex; align-items:center; justify-content:center; font-weight:800; margin-top:-1mm }
.blok-tam { margin-bottom:3.2mm }
.blok-iki { display:grid; grid-template-columns:1fr 1fr; gap:0 7mm; position:relative; margin-bottom:3.2mm }
.blok-iki:before { content:''; position:absolute; left:50%; top:0; bottom:0; border-left:1px dashed var(--cizgi) }
.blok-tam + .blok-tam, .blok-iki + .blok-tam, .blok-tam + .blok-iki { border-top:1px dashed var(--cizgi); padding-top:3.2mm }
.soru { display:flex; gap:2mm; break-inside:avoid; margin-bottom:3mm }
.soru .no { font-weight:800; color:var(--lacivert); font-size:11pt; min-width:6.5mm; line-height:1.2 }
.soru .icerik { flex:1; min-width:0 }
.soru p { margin:0 0 1.6mm; text-align:justify; hyphens:auto }
.soru p.kok { font-weight:700; margin-top:2mm }
.gorsel-kutu { margin:1.5mm 0 2mm; text-align:center }
svg.gorsel { width:100%; height:auto; display:block; font-family:'Inter','Liberation Sans',sans-serif }
.blok-tam svg.gorsel { max-height:64mm }
#s3 svg.gorsel { max-height:60mm }
#s20 svg.gorsel { max-height:none }
#s17 svg.gorsel { max-height:78mm }
.maddeler { list-style:none; padding:0; margin:0 0 1mm }
.maddeler li { display:flex; gap:2mm; margin-bottom:.9mm; text-align:justify }
.maddeler .r { font-weight:700; min-width:6mm; color:#1f2937 }
.secenekler { display:grid; gap:1mm 4mm }
.secenekler.d4 { grid-template-columns:repeat(4,1fr) }
.secenekler.d2 { grid-template-columns:1fr 1fr }
.secenekler.d1 { grid-template-columns:1fr }
.blok-iki .secenekler.d4 { grid-template-columns:1fr 1fr }
.sec b { color:var(--lacivert); margin-right:1mm }
.d1 .sec { padding-left:5.5mm; text-indent:-5.5mm }
.tbl { width:100%; border-collapse:collapse; margin:1.5mm 0 2mm; font-size:8.9pt }
.tbl th { background:#e2e8f0; color:#13294b; font-weight:700; padding:1.4mm 2mm; border:1px solid #94a3b8; text-align:left }
.tbl td { padding:1.2mm 2mm; border:1px solid #94a3b8; vertical-align:middle }
.tbl.siniflama td:first-child { width:13mm; text-align:center; white-space:nowrap }
.tbl.siniflama td:first-child b { display:inline-block; margin-right:1mm; color:#13294b; vertical-align:middle }
.tbl.siniflama td:nth-child(3), .tbl.siniflama td:nth-child(4) { width:24mm; text-align:center; background:#fffef5 }
.tbl.model { width:82%; margin-left:auto; margin-right:auto } .tbl.model td:first-child { font-weight:600 }
.tbl.dar { width:80% }
.simge { width:6.2mm; height:6.2mm; vertical-align:middle }
.el { font-family:'Caladea','Liberation Serif',serif; font-style:italic; color:#1d4ed8; font-size:10.5pt; font-weight:700 }
.konusma { display:grid; grid-template-columns:1fr 1fr; gap:3mm; margin:1mm 0 2mm }
.balon { background:#eef6ff; border:1px solid #93c5fd; border-radius:3mm; padding:2mm 3mm; position:relative; font-size:9.2pt }
.balon.sag { background:#f0fdf4; border-color:#86efac }
.kisiler { display:grid; grid-template-columns:1fr 1fr; gap:2.4mm 4mm; margin:1.5mm 0 2mm }
.kisi { display:flex; gap:2.5mm; align-items:center; background:#f8fafc; border:1px solid #e2e8f0; border-radius:3mm; padding:1.8mm 2.5mm; font-size:9.1pt }
.avatar { width:12mm; height:12mm; flex:none }
.haberler { display:grid; grid-template-columns:1fr 1fr; gap:2.5mm 4mm; margin:1.5mm 0 2mm }
.haber { background:#fffdf7; border:1px solid #e7dcc0; border-top:3px solid #13294b; border-radius:1.5mm; padding:2mm 3mm; font-size:9pt; text-align:justify; font-family:'Caladea','Liberation Serif',serif; font-size:10pt; line-height:1.3 }
.haber .hb { display:flex; align-items:center; gap:2mm; font-family:'Inter',sans-serif; font-weight:800; color:#13294b; font-size:8.6pt; margin-bottom:1mm; letter-spacing:.4px; text-transform:uppercase }
.dy-kutu { font-family:'Inter','Liberation Sans',sans-serif; font-size:8.6pt; line-height:1.3; color:#111827; text-align:left }
b.d { color:#16a34a } b.y { color:#dc2626 }
.anahtar h2 { color:var(--lacivert); margin:0 0 3mm; font-size:14pt }
.anahtar-grid { display:grid; grid-template-columns:repeat(10,1fr); gap:1.5mm; margin-bottom:5mm }
.anahtar-grid div { border:1px solid #94a3b8; border-radius:1.5mm; text-align:center; padding:1.5mm 0; font-weight:700 }
.anahtar-grid div span { display:block; font-size:8pt; color:#64748b; font-weight:600 }
.kaz { width:100%; border-collapse:collapse; font-size:8pt; line-height:1.3 }
.kaz th, .kaz td { border:1px solid #94a3b8; padding:.9mm 1.6mm; text-align:left; vertical-align:top }
.kaz th { background:#e2e8f0 }
.kaz td:nth-child(1), .kaz td:nth-child(4) { text-align:center; font-weight:700; width:10mm }
`;

function sayfaHTML(bloklar, i, toplam) {
  const ilk = i === 0;
  const ust = ilk
    ? `<div class="kapak"><div><h1>FEN BİLİMLERİ DENEME SINAVI</h1><div class="alt">Mevsimler ve İklim • DNA ve Genetik Kod • Basınç</div></div><div class="rozet"><div class="b">8</div><div class="k">SINIF</div></div></div>
       <div class="bilgi"><div>Adı:</div><div>Soyadı:</div><div>Sınıf:</div><div>No:</div></div>
       <div class="yonerge">Bu testte <b>20</b> soru vardır. Soruları okuyarak cevaplayınız ve cevaplarınızı cevap kâğıdına işaretleyiniz.</div>`
    : `<div class="ust-serit"><span class="sol">FEN BİLİMLERİ • 8. SINIF DENEME SINAVI</span><span class="sag">Mevsimler ve İklim • DNA ve Genetik Kod • Basınç</span></div>`;
  const q = (n, yan) => soruHTML(S.find((x) => x.no === n), n, yan);
  const govde = bloklar.map((b) => b.tam ? `<div class="blok-tam">${q(b.tam)}</div>` : b.yan ? `<div class="blok-tam">${q(b.yan, true)}</div>`
    : `<div class="blok-iki"><div>${b.sol.map(q).join('')}</div><div>${b.sag.map(q).join('')}</div></div>`).join('');
  return `<div class="sayfa">${ust}${govde}<div class="alt-serit"><span>8. Sınıf Fen Bilimleri Deneme Sınavı</span><span class="sn">${i + 1}</span><span>Diğer sayfaya geçiniz.</span></div></div>`
    .replace('Diğer sayfaya geçiniz.', i === toplam - 1 ? 'Test bitti. Cevaplarınızı kontrol ediniz.' : 'Diğer sayfaya geçiniz.');
}

function anahtarHTML() {
  return `<div class="sayfa anahtar"><div class="ust-serit"><span class="sol">CEVAP ANAHTARI VE KAZANIM TABLOSU</span><span class="sag">Öğretmen sayfası</span></div>
    <h2>Cevap Anahtarı</h2>
    <div class="anahtar-grid">${S.map((q) => `<div><span>${q.no}</span>${HARF[q.cevap]}</div>`).join('')}</div>
    <table class="kaz"><thead><tr><th>No</th><th>Ünite</th><th>Kazanım</th><th>Cevap</th><th>Kısa açıklama</th></tr></thead><tbody>
    ${S.map((q) => `<tr><td>${q.no}</td><td>${q.unite}</td><td>${q.kazanim}</td><td>${HARF[q.cevap]}</td><td>${q.aciklama}</td></tr>`).join('')}
    </tbody></table></div>`;
}

const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>8. Sınıf Fen Bilimleri Deneme</title><style>${CSS}</style></head>
<body>${G.ortakTanimlar}${SAYFALAR.map((b, i) => sayfaHTML(b, i, SAYFALAR.length)).join('')}${anahtarHTML()}</body></html>`;

await writeFile(path.join(DIR, 'deneme.html'), html);

// denetle aracı için düz soru bankası (HTML etiketleri temizlenmiş)
const duz = (s) => String(s ?? '').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const banka = S.map((q) => ({
  id: `8fen-d1-${String(q.no).padStart(2, '0')}`,
  kazanim: q.kazanim, unite: q.unite, tur: 'coktan-secmeli', zorluk: q.zorluk,
  soru: duz(q.kok), baglam: duz(`${q.govde ?? ''} ${q.sonra ?? ''}`),
  maddeler: q.maddeler ?? [], secenekler: q.secenekler, cevap: q.cevap, aciklama: q.aciklama,
}));
await writeFile(path.join(DIR, 'sorular.json'), JSON.stringify(banka, null, 2));

// PDF
if (!process.argv.includes('--pdf-yok')) {
  // Playwright proje bağımlılığı değil; yoksa global kurulumdan yüklenir.
  const { chromium } = await import('playwright').catch(async () => {
    const { createRequire } = await import('node:module');
    const { execSync } = await import('node:child_process');
    return createRequire(path.join(execSync('npm root -g').toString().trim(), '_'))('playwright');
  });
  const tarayici = await chromium.launch();
  const sayfa = await tarayici.newPage();
  await sayfa.goto('file://' + path.join(DIR, 'deneme.html'));
  await sayfa.evaluate(() => document.fonts.ready);
  const tasma = await sayfa.evaluate(() => [...document.querySelectorAll('.sayfa')].map((p, i) => {
    const alt = (p.querySelector('.alt-serit') ?? p).getBoundingClientRect()[p.querySelector('.alt-serit') ? 'top' : 'bottom'];
    const son = Math.max(...[...p.querySelectorAll('.soru, table.kaz')].map((e) => e.getBoundingClientRect().bottom));
    return { sayfa: i + 1, bosluk_px: Math.round(alt - son) };
  }));
  console.log(JSON.stringify(tasma));
  await sayfa.pdf({ path: path.join(DIR, 'deneme.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  if (process.argv.includes('--png')) {
    await sayfa.setViewportSize({ width: 794, height: 1123 });
    const n = await sayfa.evaluate(() => document.querySelectorAll('.sayfa').length);
    for (let i = 0; i < n; i++) {
      const elh = (await sayfa.$$('.sayfa'))[i];
      await elh.screenshot({ path: path.join(process.argv[process.argv.indexOf('--png') + 1], `s${i + 1}.png`) });
    }
  }
  await tarayici.close();
}
console.log('Tamam:', path.join(DIR, 'deneme.pdf'));
