// 業種別質問データ（Q16〜Q20に挿入）
import type { Language } from './questions';

export interface IndustryChoice {
  label: Record<Language, string>;
}

export interface IndustryQuestion {
  id: number; // 16-20
  text: Record<Language, string>;
  choices: [IndustryChoice, IndustryChoice, IndustryChoice, IndustryChoice];
}

export interface IndustryData {
  code: string;
  label: string;
  questions: IndustryQuestion[];
}

export const INDUSTRIES: { code: string; label: string }[] = [
  { code: 'manufacturing', label: '製造業・食品加工' },
  { code: 'care', label: '介護・福祉' },
  { code: 'construction', label: '建設' },
  { code: 'agriculture', label: '農業' },
  { code: 'hospitality', label: '宿泊・飲食・サービス' },
  { code: 'cleaning', label: '清掃・ビルメンテナンス' },
  { code: 'general', label: 'その他' },
];

// ===== 製造業・食品加工 =====
const manufacturing: IndustryQuestion[] = [
  {
    id: 16,
    text: {
      ja: '工場では安全のためにヘルメットや手袋の着用が必要です。これについてどう思いますか？',
      vi: 'Trong nhà máy cần đội mũ bảo hiểm và đeo găng tay để đảm bảo an toàn. Bạn nghĩ sao về điều này?',
      zh: '工厂要求戴安全帽和手套以确保安全。您对此有何看法？',
      tl: 'Sa pabrika, kailangan ang helmet at gloves para sa kaligtasan. Ano ang palagay mo?',
      id: 'Di pabrik perlu memakai helm dan sarung tangan untuk keselamatan. Bagaimana pendapat Anda?',
      ne: 'कारखानामा सुरक्षाका लागि हेल्मेट र पन्जा लगाउनु आवश्यक छ। यसबारे तपाईंको के विचार छ?',
      th: 'ในโรงงานต้องสวมหมวกนิรภัยและถุงมือเพื่อความปลอดภัย คุณคิดอย่างไร?',
    },
    choices: [
      { label: { ja: '安全は最優先。暑くても面倒でも必ず着用する', vi: 'An toàn là ưu tiên số một. Dù nóng hay bất tiện vẫn luôn đeo', zh: '安全最优先。即使热或麻烦也一定佩戴', tl: 'Safety ang priority. Kahit mainit o abala, laging isusuot', id: 'Keselamatan prioritas utama. Meski panas atau merepotkan, selalu dipakai', ne: 'सुरक्षा सर्वोपरि। गर्मी वा झन्झटिलो भए पनि अवश्य लगाउँछु', th: 'ความปลอดภัยมาก่อน สวมเสมอแม้จะร้อนหรือไม่สะดวก' } },
      { label: { ja: '必要性は理解している。ルール通りに着用する', vi: 'Hiểu sự cần thiết. Sẽ đeo theo quy định', zh: '理解必要性。按规定佩戴', tl: 'Naiintindihan ang pangangailangan. Isusuot ayon sa patakaran', id: 'Memahami kebutuhannya. Akan memakai sesuai aturan', ne: 'आवश्यकता बुझ्छु। नियमअनुसार लगाउँछु', th: 'เข้าใจความจำเป็น สวมตามกฎ' } },
      { label: { ja: '必要な場面では着用するが、それ以外は外したい', vi: 'Sẽ đeo khi cần, ngoài ra muốn tháo ra', zh: '必要时佩戴，其他时候想摘掉', tl: 'Isusuot kung kailangan, tatanggalin kung hindi', id: 'Memakai saat diperlukan, selain itu ingin melepas', ne: 'आवश्यक ठाउँमा लगाउँछु, अरू बेला हटाउन चाहन्छु', th: 'สวมเมื่อจำเป็น นอกนั้นอยากถอด' } },
      { label: { ja: '動きにくいので最小限にしたい', vi: 'Khó di chuyển nên muốn giảm thiểu', zh: '影响行动所以想尽量少戴', tl: 'Mahirap gumalaw kaya gusto i-minimize', id: 'Sulit bergerak jadi ingin meminimalkan', ne: 'चल्न गाह्रो हुन्छ त्यसैले न्यूनतम मात्र लगाउन चाहन्छु', th: 'เคลื่อนไหวลำบากจึงอยากใส่น้อยที่สุด' } },
    ],
  },
  {
    id: 17,
    text: {
      ja: '同じ作業を長時間繰り返すことについて、どう感じますか？',
      vi: 'Bạn cảm thấy thế nào về việc lặp đi lặp lại cùng một công việc trong thời gian dài?',
      zh: '对于长时间重复同一工作，您有何感受？',
      tl: 'Paano mo nararamdaman ang pag-uulit ng parehong gawain sa mahabang oras?',
      id: 'Bagaimana perasaan Anda tentang mengulang pekerjaan yang sama dalam waktu lama?',
      ne: 'लामो समयसम्म उही काम दोहोर्याउने बारेमा तपाईंलाई कस्तो लाग्छ?',
      th: 'คุณรู้สึกอย่างไรกับการทำงานเดิมซ้ำเป็นเวลานาน?',
    },
    choices: [
      { label: { ja: '集中して精度を高めていくのが得意', vi: 'Giỏi tập trung và nâng cao độ chính xác', zh: '擅长集中精力提高精度', tl: 'Magaling mag-focus at pataasin ang accuracy', id: 'Pandai fokus dan meningkatkan akurasi', ne: 'ध्यान केन्द्रित गरेर शुद्धता बढाउन राम्रो', th: 'ถนัดในการจดจ่อและเพิ่มความแม่นยำ' } },
      { label: { ja: '慣れれば問題ない。自分なりのペースを作れる', vi: 'Quen rồi thì không vấn đề. Tạo được nhịp độ riêng', zh: '习惯了就没问题。能建立自己的节奏', tl: 'Kapag nasanay, okay na. Makakagawa ng sariling pace', id: 'Kalau sudah terbiasa tidak masalah. Bisa membuat pace sendiri', ne: 'बानी परेपछि समस्या छैन। आफ्नै गतिमा काम गर्न सक्छु', th: 'เมื่อชินแล้วไม่มีปัญหา สร้างจังหวะของตัวเองได้' } },
      { label: { ja: 'できるが、時々変化のある仕事もほしい', vi: 'Làm được, nhưng đôi khi muốn có sự thay đổi', zh: '可以做，但有时想要有变化的工作', tl: 'Kaya naman, pero gusto ng pagbabago paminsan-minsan', id: 'Bisa, tapi kadang ingin pekerjaan yang bervariasi', ne: 'गर्न सक्छु, तर कहिलेकाहीं फरक काम पनि चाहिन्छ', th: 'ทำได้ แต่บางครั้งอยากมีงานที่เปลี่ยนแปลงบ้าง' } },
      { label: { ja: '正直、飽きやすいタイプだと思う', vi: 'Thật lòng, tôi nghĩ mình dễ chán', zh: '老实说，我觉得自己容易厌倦', tl: 'Sa totoo lang, madali akong magsawa', id: 'Jujur, saya tipe yang mudah bosan', ne: 'इमानदारीमा, म छिट्टै बोरिन्ने प्रकारको हुँ', th: 'พูดตรงๆ เป็นคนเบื่อง่าย' } },
    ],
  },
  {
    id: 18,
    text: {
      ja: '製品に小さな傷を見つけました。出荷には影響なさそうです。どうしますか？',
      vi: 'Bạn phát hiện vết xước nhỏ trên sản phẩm. Có vẻ không ảnh hưởng đến giao hàng. Bạn sẽ làm gì?',
      zh: '您发现产品上有小划痕。看起来不影响出货。您会怎么做？',
      tl: 'Nakakita ka ng maliit na gasgas sa produkto. Mukhang hindi makakaapekto sa shipment. Ano ang gagawin mo?',
      id: 'Anda menemukan goresan kecil pada produk. Sepertinya tidak mempengaruhi pengiriman. Apa yang Anda lakukan?',
      ne: 'उत्पादनमा सानो खरोंच भेट्टाउनुभयो। ढुवानीमा असर नपर्ने जस्तो छ। के गर्नुहुन्छ?',
      th: 'คุณพบรอยขีดข่วนเล็กๆ บนผลิตภัณฑ์ ดูเหมือนจะไม่กระทบการส่งสินค้า คุณจะทำอย่างไร?',
    },
    choices: [
      { label: { ja: '小さくても必ず報告する。品質基準は自分で判断しない', vi: 'Dù nhỏ cũng báo cáo. Không tự phán đoán tiêu chuẩn chất lượng', zh: '即使很小也一定报告。不自行判断质量标准', tl: 'Kahit maliit, ire-report. Hindi ko hahatulan ang quality standard', id: 'Sekecil apapun pasti dilaporkan. Tidak menilai standar kualitas sendiri', ne: 'सानो भए पनि अवश्य रिपोर्ट गर्छु। गुणस्तर आफैं निर्णय गर्दिन', th: 'แม้เล็กน้อยก็ต้องรายงาน ไม่ตัดสินมาตรฐานคุณภาพเอง' } },
      { label: { ja: '基準を確認してから判断する', vi: 'Kiểm tra tiêu chuẩn rồi mới quyết định', zh: '确认标准后再判断', tl: 'Suriin ang standard bago magdesisyon', id: 'Memeriksa standar dulu baru memutuskan', ne: 'मापदण्ड हेरेर निर्णय गर्छु', th: 'ตรวจสอบมาตรฐานก่อนตัดสินใจ' } },
      { label: { ja: '影響なさそうなら、次の製品の作業に集中する', vi: 'Nếu không ảnh hưởng thì tập trung vào sản phẩm tiếp theo', zh: '如果不影响就专注下一个产品', tl: 'Kung walang epekto, mag-focus sa susunod na produkto', id: 'Jika tidak berpengaruh, fokus ke produk berikutnya', ne: 'असर नपर्ने भए अर्को उत्पादनमा ध्यान दिन्छु', th: 'ถ้าไม่กระทบก็โฟกัสผลิตภัณฑ์ถัดไป' } },
      { label: { ja: '出荷に問題なければ大丈夫だと思う', vi: 'Nếu không ảnh hưởng giao hàng thì không sao', zh: '不影响出货就没问题', tl: 'Kung okay sa shipment, okay na', id: 'Kalau tidak masalah untuk pengiriman, tidak apa-apa', ne: 'ढुवानीमा समस्या नभए ठिकै हो', th: 'ถ้าไม่มีปัญหากับการส่งก็ไม่เป็นไร' } },
    ],
  },
  {
    id: 19,
    text: {
      ja: '作業中に機械から普段と違う音がしました。どうしますか？',
      vi: 'Trong khi làm việc, máy phát ra tiếng khác thường. Bạn sẽ làm gì?',
      zh: '工作中机器发出异常声音。您会怎么做？',
      tl: 'Habang nagtatrabaho, may kakaibang tunog mula sa makina. Ano ang gagawin mo?',
      id: 'Saat bekerja, mesin mengeluarkan suara yang tidak biasa. Apa yang Anda lakukan?',
      ne: 'काम गर्दा मेसिनबाट असामान्य आवाज आयो। के गर्नुहुन्छ?',
      th: 'ระหว่างทำงาน เครื่องจักรมีเสียงผิดปกติ คุณจะทำอย่างไร?',
    },
    choices: [
      { label: { ja: 'すぐに機械を止めて、担当者に報告する', vi: 'Dừng máy ngay và báo cho người phụ trách', zh: '立即停机并报告负责人', tl: 'Ihinto agad ang makina at i-report sa naka-assign', id: 'Segera menghentikan mesin dan melapor ke penanggung jawab', ne: 'तुरुन्तै मेसिन रोकेर जिम्मेवार व्यक्तिलाई रिपोर्ट गर्छु', th: 'หยุดเครื่องทันทีและรายงานผู้รับผิดชอบ' } },
      { label: { ja: '周りに確認して、異常かどうか相談する', vi: 'Hỏi người xung quanh xem có bất thường không', zh: '向周围人确认是否异常', tl: 'Itanong sa iba kung abnormal ba', id: 'Bertanya ke orang sekitar apakah ini abnormal', ne: 'वरिपरिलाई सोधेर असामान्य हो कि छैन सल्लाह गर्छु', th: 'ถามคนรอบข้างว่าผิดปกติหรือไม่' } },
      { label: { ja: 'しばらく様子を見て、悪化したら報告する', vi: 'Theo dõi một lúc, báo cáo nếu xấu đi', zh: '先观察一下，恶化了再报告', tl: 'Panoorin muna, kung lumala saka mag-report', id: 'Mengamati dulu, melaporkan jika memburuk', ne: 'केही बेर हेर्छु, बिग्रिएमा रिपोर्ट गर्छु', th: 'สังเกตสักพัก ถ้าแย่ลงค่อยรายงาน' } },
      { label: { ja: '機械のことは詳しくないので、そのまま作業を続ける', vi: 'Không rành máy móc nên tiếp tục làm việc', zh: '不懂机器所以继续工作', tl: 'Hindi ko alam ang makina kaya itutuloy ang trabaho', id: 'Tidak paham mesin jadi melanjutkan pekerjaan', ne: 'मेसिनको बारेमा जानकारी छैन त्यसैले काम जारी राख्छु', th: 'ไม่รู้เรื่องเครื่องจักรจึงทำงานต่อ' } },
    ],
  },
  {
    id: 20,
    text: {
      ja: '生産目標がとても厳しい日、チームの雰囲気が悪くなりました。あなたはどうしますか？',
      vi: 'Vào ngày mục tiêu sản xuất rất khắt khe, không khí trong nhóm trở nên xấu. Bạn sẽ làm gì?',
      zh: '在生产目标非常紧的日子里，团队气氛变差了。您会怎么做？',
      tl: 'Sa araw na napakahigpit ng production target, lumala ang mood ng team. Ano ang gagawin mo?',
      id: 'Pada hari dengan target produksi yang sangat ketat, suasana tim memburuk. Apa yang Anda lakukan?',
      ne: 'उत्पादन लक्ष्य धेरै कडा भएको दिन, टोलीको माहौल खराब भयो। तपाईं के गर्नुहुन्छ?',
      th: 'ในวันที่เป้าการผลิตหนักมาก บรรยากาศในทีมแย่ลง คุณจะทำอย่างไร?',
    },
    choices: [
      { label: { ja: '声をかけ合い、チームで乗り越えようと働きかける', vi: 'Động viên nhau và cùng nhóm vượt qua', zh: '互相鼓励，推动团队一起克服', tl: 'Mag-encourage at tulungan ang team na malampasan', id: 'Saling menyemangati dan mendorong tim untuk melewatinya bersama', ne: 'एकअर्कालाई हौसला दिँदै टोलीमा सँगै पार गर्न प्रेरित गर्छु', th: 'ให้กำลังใจกันและผลักดันทีมให้ฝ่าฟัน' } },
      { label: { ja: '自分の作業に集中して、できる限り貢献する', vi: 'Tập trung vào công việc của mình và đóng góp hết sức', zh: '专注自己的工作，尽力贡献', tl: 'Mag-focus sa sariling trabaho at mag-ambag hangga\'t maaari', id: 'Fokus pada pekerjaan sendiri dan berkontribusi semaksimal mungkin', ne: 'आफ्नो काममा ध्यान दिएर सकेसम्म योगदान गर्छु', th: 'โฟกัสงานตัวเองและทุ่มเทให้มากที่สุด' } },
      { label: { ja: '無理しすぎないよう、ペースを調整する', vi: 'Điều chỉnh nhịp độ để không cố quá sức', zh: '调整节奏，不要太勉强', tl: 'I-adjust ang pace para hindi mag-overwork', id: 'Menyesuaikan kecepatan agar tidak terlalu memaksakan diri', ne: 'बढी थकान नहोस् भनेर गति मिलाउँछु', th: 'ปรับจังหวะเพื่อไม่ให้ทำงานหนักเกินไป' } },
      { label: { ja: '目標が厳しすぎることを上司に伝える', vi: 'Nói với cấp trên rằng mục tiêu quá khắt khe', zh: '告诉上级目标太严格了', tl: 'Sabihin sa boss na masyadong mahigpit ang target', id: 'Memberitahu atasan bahwa target terlalu ketat', ne: 'लक्ष्य अत्यधिक कडा छ भनेर माथिल्लो अधिकारीलाई बताउँछु', th: 'บอกหัวหน้าว่าเป้าหมายเข้มงวดเกินไป' } },
    ],
  },
];

// ===== 介護・福祉 =====
const care: IndustryQuestion[] = [
  {
    id: 16,
    text: {
      ja: '高齢者の方が同じ話を何度も繰り返されます。どう対応しますか？',
      vi: 'Người cao tuổi lặp đi lặp lại cùng một câu chuyện. Bạn sẽ ứng xử thế nào?',
      zh: '老人反复讲同一个故事。您会如何应对？',
      tl: 'Paulit-ulit na kinukwento ng matanda ang parehong kwento. Paano ka tutugon?',
      id: 'Lansia mengulangi cerita yang sama berkali-kali. Bagaimana Anda merespons?',
      ne: 'बुजुर्गले उही कुरा बारम्बार भन्नुहुन्छ। तपाईं कसरी प्रतिक्रिया गर्नुहुन्छ?',
      th: 'ผู้สูงอายุเล่าเรื่องเดิมซ้ำแล้วซ้ำเล่า คุณจะรับมืออย่างไร?',
    },
    choices: [
      { label: { ja: '毎回初めて聞くように、笑顔で聞く', vi: 'Lắng nghe mỉm cười như lần đầu mỗi lần', zh: '每次都像第一次听一样微笑倾听', tl: 'Pakinggan na may ngiti na parang unang beses', id: 'Mendengarkan dengan senyum seolah baru pertama kali', ne: 'हरेक पटक पहिलो पटक सुनेजस्तो मुस्कान दिएर सुन्छु', th: 'ฟังด้วยรอยยิ้มเหมือนได้ยินครั้งแรกทุกครั้ง' } },
      { label: { ja: '話を聞きながら、さりげなく別の話題に誘導する', vi: 'Lắng nghe và nhẹ nhàng chuyển sang chủ đề khác', zh: '边听边巧妙地引导到其他话题', tl: 'Pakinggan at dahan-dahang ilipat sa ibang topic', id: 'Mendengarkan sambil perlahan mengarahkan ke topik lain', ne: 'सुन्दै सहजरूपमा अर्को विषयतर्फ लैजान्छु', th: 'ฟังแล้วค่อยๆ เปลี่ยนเรื่อง' } },
      { label: { ja: '「その話はさっき聞きましたよ」とやさしく伝える', vi: 'Nhẹ nhàng nói "Câu chuyện đó bác đã kể rồi"', zh: '温和地说"这个故事您刚才讲过了"', tl: 'Mahinahong sabihin na "narinig ko na po iyan kanina"', id: 'Dengan lembut bilang "cerita itu sudah disampaikan tadi"', ne: 'कोमलतापूर्वक "त्यो कुरा अघि भन्नुभयो" भन्छु', th: 'บอกอย่างนุ่มนวลว่า "เรื่องนี้เล่าไปแล้วนะคะ"' } },
      { label: { ja: '忙しいときは聞き流してしまうこともある', vi: 'Khi bận có thể bỏ qua', zh: '忙的时候可能会忽略', tl: 'Kapag busy, minsan hinahayaan na lang', id: 'Saat sibuk, kadang hanya membiarkan', ne: 'व्यस्त हुँदा कहिलेकाहीं बेवास्ता गर्छु', th: 'ตอนยุ่งบางทีก็ปล่อยผ่าน' } },
    ],
  },
  {
    id: 17,
    text: {
      ja: '利用者の方の着替えや入浴の介助について、どう感じますか？',
      vi: 'Bạn cảm thấy thế nào về việc hỗ trợ thay quần áo và tắm cho người sử dụng dịch vụ?',
      zh: '关于帮助服务对象换衣服和洗澡，您有何感受？',
      tl: 'Paano mo nararamdaman ang pagtulong sa pagpapalit ng damit at paliligo ng mga kliyente?',
      id: 'Bagaimana perasaan Anda tentang membantu klien berganti pakaian dan mandi?',
      ne: 'सेवाग्राहीको लुगा फेर्ने र नुहाउने सहायताबारे तपाईंलाई कस्तो लाग्छ?',
      th: 'คุณรู้สึกอย่างไรกับการช่วยเหลือผู้ใช้บริการเปลี่ยนเสื้อผ้าและอาบน้ำ?',
    },
    choices: [
      { label: { ja: '相手の尊厳を守りながら、丁寧に対応したい', vi: 'Muốn ứng xử tận tâm, tôn trọng phẩm giá của họ', zh: '想在尊重对方尊严的同时认真对待', tl: 'Gustong mag-assist nang maayos habang pinoprotektahan ang dignidad nila', id: 'Ingin melayani dengan baik sambil menjaga martabat mereka', ne: 'उनको सम्मान जोगाउँदै ध्यानपूर्वक सेवा गर्न चाहन्छु', th: 'อยากดูแลอย่างทะนุถนอมพร้อมรักษาศักดิ์ศรีของเขา' } },
      { label: { ja: '仕事として割り切れる。研修で学びたい', vi: 'Coi đó là công việc. Muốn học qua đào tạo', zh: '能当作工作来做。想通过培训学习', tl: 'Kaya itong gawin bilang trabaho. Gustong matuto sa training', id: 'Bisa diterima sebagai pekerjaan. Ingin belajar melalui pelatihan', ne: 'कामको रूपमा स्वीकार गर्न सक्छु। तालिमबाट सिक्न चाहन्छु', th: 'ยอมรับได้ว่าเป็นงาน อยากเรียนรู้จากการฝึกอบรม' } },
      { label: { ja: '少し抵抗はあるが、慣れれば大丈夫だと思う', vi: 'Hơi ngại nhưng nghĩ sẽ quen', zh: '有点抵触，但觉得习惯了就好', tl: 'Medyo may hesitation pero okay na kapag nasanay', id: 'Sedikit canggung tapi akan terbiasa', ne: 'अलि असहज छ तर बानी परेपछि ठिकै हुन्छ', th: 'รู้สึกอึดอัดเล็กน้อย แต่คิดว่าชินแล้วจะไม่เป็นไร' } },
      { label: { ja: '正直、身体介助は苦手だと思う', vi: 'Thật lòng, nghĩ rằng hỗ trợ thể chất không phải sở trường', zh: '老实说，觉得身体护理不是自己的强项', tl: 'Sa totoo lang, hindi ko forte ang physical care', id: 'Jujur, bantuan fisik bukan kelebihan saya', ne: 'इमानदारीमा, शारीरिक सहायता मेरो बलियो पक्ष होइन', th: 'พูดตรงๆ การดูแลร่างกายไม่ใช่จุดแข็ง' } },
    ],
  },
  {
    id: 18,
    text: {
      ja: '利用者の方が急に怒り出しました。理由がわかりません。どうしますか？',
      vi: 'Người dùng bất ngờ nổi giận. Bạn không biết lý do. Bạn sẽ làm gì?',
      zh: '服务对象突然发怒了。您不知道原因。您会怎么做？',
      tl: 'Biglang nagalit ang kliyente. Hindi mo alam ang dahilan. Ano ang gagawin mo?',
      id: 'Klien tiba-tiba marah. Anda tidak tahu alasannya. Apa yang Anda lakukan?',
      ne: 'सेवाग्राही अचानक रिसाउनुभयो। कारण थाहा छैन। के गर्नुहुन्छ?',
      th: 'ผู้ใช้บริการโกรธขึ้นมาอย่างกะทันหัน คุณไม่ทราบสาเหตุ จะทำอย่างไร?',
    },
    choices: [
      { label: { ja: 'まず安全を確認し、穏やかに寄り添いながら原因を探る', vi: 'Xác nhận an toàn trước, bình tĩnh ở bên và tìm nguyên nhân', zh: '先确认安全，温和地陪伴并探寻原因', tl: 'Siguraduhin muna ang safety, kalmadong samahan at hanapin ang dahilan', id: 'Pastikan keamanan dulu, dengan tenang mendampingi dan mencari penyebab', ne: 'पहिले सुरक्षा सुनिश्चित गरी, शान्तरूपमा साथ दिँदै कारण खोज्छु', th: 'ตรวจสอบความปลอดภัยก่อน แล้วอยู่ข้างๆ อย่างสงบพร้อมหาสาเหตุ' } },
      { label: { ja: '少し距離を取って、落ち着くのを待ってから話しかける', vi: 'Giữ khoảng cách, đợi bình tĩnh rồi mới nói chuyện', zh: '保持距离，等对方冷静后再沟通', tl: 'Lumayo muna, hintayin na kumalma bago kausapin', id: 'Menjaga jarak, menunggu tenang baru berbicara', ne: 'अलि टाढा भएर शान्त हुन पर्खेर कुरा गर्छु', th: 'ถอยออกมาเล็กน้อย รอให้สงบแล้วค่อยคุย' } },
      { label: { ja: 'すぐに他のスタッフを呼んで対応を任せる', vi: 'Gọi nhân viên khác ngay để xử lý', zh: '马上叫其他工作人员来处理', tl: 'Tumawag agad ng ibang staff para sila ang mag-asikaso', id: 'Segera memanggil staf lain untuk menangani', ne: 'तुरुन्तै अरू स्टाफलाई बोलाएर सुम्पिन्छु', th: 'เรียกเจ้าหน้าที่คนอื่นมาดูแลทันที' } },
      { label: { ja: '怒りの原因がわからないと対応が難しい', vi: 'Khó xử lý khi không biết nguyên nhân giận dữ', zh: '不知道原因就很难应对', tl: 'Mahirap tumugon kung hindi alam ang dahilan', id: 'Sulit merespons jika tidak tahu penyebabnya', ne: 'रिसको कारण नजानी प्रतिक्रिया गर्न गाह्रो छ', th: 'ยากที่จะรับมือถ้าไม่รู้สาเหตุ' } },
    ],
  },
  {
    id: 19,
    text: {
      ja: '夜勤や早朝勤務など、変則的なシフトについてどう思いますか？',
      vi: 'Bạn nghĩ sao về ca làm việc bất thường như ca đêm hoặc ca sáng sớm?',
      zh: '对于夜班或早班等不规律的班次，您怎么看？',
      tl: 'Ano ang palagay mo sa irregular na shifts tulad ng night shift o early morning?',
      id: 'Bagaimana pendapat Anda tentang shift tidak teratur seperti shift malam atau pagi?',
      ne: 'रात्रि ड्युटी वा बिहानको ड्युटी जस्ता अनियमित शिफ्टबारे के विचार छ?',
      th: 'คุณคิดอย่างไรกับกะทำงานที่ไม่ปกติ เช่น กะกลางคืนหรือเช้าตรู่?',
    },
    choices: [
      { label: { ja: '必要なら柔軟に対応できる。体調管理をしっかりする', vi: 'Có thể linh hoạt nếu cần. Sẽ quản lý sức khỏe tốt', zh: '如果需要可以灵活应对。会好好管理身体', tl: 'Kaya kong mag-adjust kung kailangan. Alagaan ang kalusugan', id: 'Bisa fleksibel jika diperlukan. Akan menjaga kesehatan', ne: 'आवश्यक भए लचिलो हुन सक्छु। स्वास्थ्य व्यवस्थापन राम्ररी गर्छु', th: 'ยืดหยุ่นได้ถ้าจำเป็น จะดูแลสุขภาพให้ดี' } },
      { label: { ja: '慣れるまで時間はかかるが、やってみたい', vi: 'Cần thời gian để quen nhưng muốn thử', zh: '需要时间适应但想尝试', tl: 'Kailangan ng oras para masanay pero gusto subukan', id: 'Butuh waktu untuk terbiasa tapi ingin mencoba', ne: 'बस्न समय लाग्छ तर प्रयास गर्न चाहन्छु', th: 'ต้องใช้เวลาปรับตัวแต่อยากลอง' } },
      { label: { ja: 'できれば日勤がいいが、必要なら対応する', vi: 'Thích ca ngày hơn nhưng sẽ làm nếu cần', zh: '最好是日班，但必要时可以接受', tl: 'Mas gusto ng day shift pero gagawin kung kailangan', id: 'Lebih suka shift siang, tapi bisa jika diperlukan', ne: 'दिनको शिफ्ट राम्रो तर आवश्यक भए गर्न सक्छु', th: 'ชอบกะกลางวันมากกว่า แต่ถ้าจำเป็นก็ทำได้' } },
      { label: { ja: '生活リズムが乱れるのが心配', vi: 'Lo lắng vì nhịp sinh hoạt bị đảo lộn', zh: '担心打乱生活节奏', tl: 'Nag-aalala sa pagkasira ng daily routine', id: 'Khawatir ritme hidup terganggu', ne: 'जीवनको लय बिग्रिने चिन्ता छ', th: 'กังวลว่าจะรบกวนจังหวะชีวิต' } },
    ],
  },
  {
    id: 20,
    text: {
      ja: '利用者のプライバシー（個人情報や体の状態）について、どう考えますか？',
      vi: 'Bạn nghĩ sao về quyền riêng tư của người sử dụng (thông tin cá nhân, tình trạng cơ thể)?',
      zh: '关于服务对象的隐私（个人信息和身体状况），您怎么看？',
      tl: 'Ano ang palagay mo sa privacy ng kliyente (personal info at kondisyon ng katawan)?',
      id: 'Bagaimana pendapat Anda tentang privasi klien (informasi pribadi dan kondisi fisik)?',
      ne: 'सेवाग्राहीको गोपनीयता (व्यक्तिगत जानकारी र शारीरिक अवस्था) बारे के सोच्नुहुन्छ?',
      th: 'คุณคิดอย่างไรเกี่ยวกับความเป็นส่วนตัวของผู้ใช้บริการ (ข้อมูลส่วนตัวและสภาพร่างกาย)?',
    },
    choices: [
      { label: { ja: '絶対に外部に漏らさない。SNSでの共有も厳禁', vi: 'Tuyệt đối không tiết lộ ra ngoài. Cấm chia sẻ trên MXH', zh: '绝不泄露。严禁在社交媒体分享', tl: 'Hindi ko dapat i-share sa labas. Bawal sa social media', id: 'Tidak boleh bocor ke luar. Dilarang berbagi di media sosial', ne: 'बाहिर कहिल्यै भन्दिन। सामाजिक सञ्जालमा साझा गर्न सख्त मनाही', th: 'ต้องไม่เปิดเผยเด็ดขาด ห้ามแชร์ใน SNS' } },
      { label: { ja: '仕事上必要な情報共有は適切に行い、それ以外は守る', vi: 'Chia sẻ thông tin cần cho công việc, ngoài ra bảo mật', zh: '适当分享工作需要的信息，其他保密', tl: 'Mag-share ng info kung kailangan sa trabaho, protektahan ang iba', id: 'Berbagi informasi yang diperlukan untuk pekerjaan, menjaga yang lain', ne: 'काममा चाहिने जानकारी उचित रूपमा साझा गरी बाँकी गोप्य राख्छु', th: 'แชร์ข้อมูลที่จำเป็นสำหรับงาน นอกนั้นรักษาความลับ' } },
      { label: { ja: '会社のルールに従って対応する', vi: 'Xử lý theo quy định của công ty', zh: '按公司规定处理', tl: 'Susundin ang patakaran ng kumpanya', id: 'Mengikuti aturan perusahaan', ne: 'कम्पनीको नियमअनुसार गर्छु', th: 'ทำตามกฎของบริษัท' } },
      { label: { ja: 'あまり意識したことがない', vi: 'Chưa bao giờ nghĩ nhiều về điều này', zh: '没怎么在意过', tl: 'Hindi ko masyadong naiisip', id: 'Belum terlalu memikirkannya', ne: 'यसबारे बढी सोचेको छैन', th: 'ไม่ค่อยได้คิดเรื่องนี้' } },
    ],
  },
];

// ===== 建設 =====
const construction: IndustryQuestion[] = [
  {
    id: 16,
    text: {
      ja: '建設現場では高所での作業があります。これについてどう感じますか？',
      vi: 'Công trình xây dựng có công việc trên cao. Bạn cảm thấy thế nào?',
      zh: '建筑工地有高空作业。您对此有何感受？',
      tl: 'Sa construction site may trabaho sa mataas na lugar. Paano mo nararamdaman?',
      id: 'Di lokasi konstruksi ada pekerjaan di ketinggian. Bagaimana perasaan Anda?',
      ne: 'निर्माण स्थलमा उच्च स्थानमा काम हुन्छ। तपाईंलाई कस्तो लाग्छ?',
      th: 'ในไซต์ก่อสร้างมีงานที่สูง คุณรู้สึกอย่างไร?',
    },
    choices: [
      { label: { ja: '安全装備を信頼して取り組める。高所は平気', vi: 'Tin tưởng thiết bị an toàn. Không sợ độ cao', zh: '信任安全设备。不怕高处', tl: 'Nagtitiwala sa safety equipment. Hindi takot sa taas', id: 'Percaya pada peralatan keselamatan. Tidak takut ketinggian', ne: 'सुरक्षा उपकरणमा विश्वास गर्छु। उचाइमा डर लाग्दैन', th: 'เชื่อมั่นในอุปกรณ์ความปลอดภัย ไม่กลัวที่สูง' } },
      { label: { ja: '安全対策をしっかり学んでから挑戦したい', vi: 'Muốn học kỹ biện pháp an toàn trước khi thử', zh: '想认真学习安全措施后再挑战', tl: 'Gustong matuto muna ng safety measures bago subukan', id: 'Ingin belajar keselamatan dengan baik dulu sebelum mencoba', ne: 'सुरक्षा उपायहरू राम्ररी सिकेर मात्र चुनौती लिन चाहन्छु', th: 'อยากเรียนรู้มาตรการความปลอดภัยให้ดีก่อนจึงลอง' } },
      { label: { ja: '少し不安だが、慣れれば対応できると思う', vi: 'Hơi lo nhưng nghĩ sẽ quen', zh: '有点不安但觉得习惯了就好', tl: 'Medyo kinakabahan pero kaya kapag nasanay na', id: 'Sedikit cemas tapi bisa terbiasa', ne: 'अलि चिन्ता छ तर बानी परेपछि गर्न सक्छु', th: 'กังวลเล็กน้อยแต่ชินแล้วน่าจะทำได้' } },
      { label: { ja: '高い場所は苦手。できれば地上の作業がいい', vi: 'Sợ chỗ cao. Thích làm dưới đất hơn', zh: '不擅长高处。最好在地面工作', tl: 'Takot sa taas. Mas gusto sa lupa', id: 'Tidak suka ketinggian. Lebih suka di darat', ne: 'उचाइ मन पर्दैन। सम्भव भए जमिनमा काम गर्न चाहन्छु', th: 'ไม่ถนัดที่สูง อยากทำงานบนพื้นดิน' } },
    ],
  },
  {
    id: 17,
    text: {
      ja: '現場で安全ルールを守らない人を見かけました。どうしますか？',
      vi: 'Bạn thấy người không tuân thủ quy tắc an toàn ở công trường. Bạn sẽ làm gì?',
      zh: '您看到有人在工地不遵守安全规则。您会怎么做？',
      tl: 'Nakakita ka ng hindi sumusunod sa safety rules sa site. Ano ang gagawin mo?',
      id: 'Anda melihat seseorang tidak mematuhi aturan keselamatan di lokasi. Apa yang Anda lakukan?',
      ne: 'साइटमा कसैले सुरक्षा नियम नमानेको देख्नुभयो। के गर्नुहुन्छ?',
      th: 'คุณเห็นคนไม่ทำตามกฎความปลอดภัยในไซต์ คุณจะทำอย่างไร?',
    },
    choices: [
      { label: { ja: '直接声をかけて注意する。命に関わることだから', vi: 'Trực tiếp nhắc nhở. Vì liên quan đến tính mạng', zh: '直接提醒。因为关乎生命', tl: 'Direktang sabihan. Dahil buhay ang nakataya', id: 'Langsung mengingatkan. Karena menyangkut nyawa', ne: 'सिधै भनेर सचेत गराउँछु। ज्यानको कुरा भएकोले', th: 'บอกโดยตรง เพราะเกี่ยวกับชีวิต' } },
      { label: { ja: '現場監督に報告して対処してもらう', vi: 'Báo cho giám sát công trường xử lý', zh: '报告现场主管处理', tl: 'I-report sa site supervisor para ma-address', id: 'Melaporkan ke pengawas lapangan', ne: 'साइट सुपरभाइजरलाई रिपोर्ट गर्छु', th: 'รายงานหัวหน้าไซต์ให้จัดการ' } },
      { label: { ja: '自分は安全ルールを守る。他人のことは口を出しにくい', vi: 'Mình tuân thủ. Khó nói người khác', zh: '自己遵守就好。不太好说别人', tl: 'Ako susunod. Mahirap magsabi sa iba', id: 'Saya sendiri patuh. Sulit menegur orang lain', ne: 'म आफैं नियम पालना गर्छु। अरूलाई भन्न गाह्रो', th: 'ตัวเองทำตามกฎ ยากที่จะบอกคนอื่น' } },
      { label: { ja: '自分の作業に集中する', vi: 'Tập trung vào công việc của mình', zh: '专注自己的工作', tl: 'Mag-focus sa sariling trabaho', id: 'Fokus pada pekerjaan sendiri', ne: 'आफ्नो काममा ध्यान दिन्छु', th: 'โฟกัสงานตัวเอง' } },
    ],
  },
  {
    id: 18,
    text: {
      ja: '天候が悪い中での屋外作業について、どう考えますか？',
      vi: 'Bạn nghĩ sao về làm việc ngoài trời trong thời tiết xấu?',
      zh: '关于在恶劣天气中进行户外工作，您怎么看？',
      tl: 'Ano ang palagay mo sa outdoor work sa masamang panahon?',
      id: 'Bagaimana pendapat Anda tentang bekerja di luar ruangan saat cuaca buruk?',
      ne: 'खराब मौसममा बाहिरी काम गर्नेबारे के सोच्नुहुन्छ?',
      th: 'คุณคิดอย่างไรกับการทำงานกลางแจ้งในสภาพอากาศเลวร้าย?',
    },
    choices: [
      { label: { ja: '適切な準備をすれば問題ない。現場仕事の一部', vi: 'Chuẩn bị đúng cách thì không sao. Là một phần của công việc', zh: '做好准备就没问题。这是现场工作的一部分', tl: 'Kung may tamang preparasyon, walang problema. Bahagi ng trabaho', id: 'Dengan persiapan yang tepat tidak masalah. Bagian dari pekerjaan', ne: 'उचित तयारी गरे समस्या छैन। यो साइट कामको अंश हो', th: 'เตรียมตัวดีก็ไม่มีปัญหา เป็นส่วนหนึ่งของงานก่อสร้าง' } },
      { label: { ja: '安全に問題がなければ対応できる', vi: 'Nếu không ảnh hưởng an toàn thì được', zh: '如果安全没问题就可以', tl: 'Kung walang safety issue, kaya', id: 'Jika tidak ada masalah keamanan, bisa dilakukan', ne: 'सुरक्षामा समस्या नभए गर्न सक्छु', th: 'ถ้าไม่มีปัญหาด้านความปลอดภัยก็ทำได้' } },
      { label: { ja: '雨の日は室内作業に切り替えてほしい', vi: 'Ngày mưa muốn chuyển sang làm trong nhà', zh: '下雨天希望换到室内工作', tl: 'Sa ulan, gusto mag-switch sa indoor work', id: 'Saat hujan ingin beralih ke pekerjaan dalam ruangan', ne: 'पानी परेको दिन भित्री काममा सार्नुपर्छ', th: 'วันฝนตกอยากเปลี่ยนเป็นงานในร่ม' } },
      { label: { ja: '屋外作業はなるべく避けたい', vi: 'Muốn tránh làm ngoài trời', zh: '尽量避免户外工作', tl: 'Gusto iwasan ang outdoor work', id: 'Ingin menghindari pekerjaan luar ruangan', ne: 'बाहिरी काम सकेसम्म टाढा रहन चाहन्छु', th: 'อยากหลีกเลี่ยงงานกลางแจ้ง' } },
    ],
  },
  {
    id: 19,
    text: {
      ja: '体力的にきつい作業が続く日もあります。どう対処しますか？',
      vi: 'Có những ngày công việc nặng nhọc liên tục. Bạn đối phó thế nào?',
      zh: '有些日子会持续进行体力繁重的工作。您如何应对？',
      tl: 'May mga araw na sunod-sunod ang mabibigat na trabaho. Paano ka mag-cope?',
      id: 'Ada hari-hari di mana pekerjaan berat secara fisik terus-menerus. Bagaimana Anda mengatasinya?',
      ne: 'शारीरिक रूपमा कडा काम लगातार हुने दिनहरू पनि हुन्छन्। कसरी सामना गर्नुहुन्छ?',
      th: 'มีบางวันที่งานหนักทางกายต่อเนื่อง คุณรับมืออย่างไร?',
    },
    choices: [
      { label: { ja: '日頃から体力づくりをして、万全の状態で臨む', vi: 'Rèn luyện thể lực hàng ngày để luôn sẵn sàng', zh: '平时锻炼体力，以最佳状态应对', tl: 'Nag-eehersisyo araw-araw para laging handa', id: 'Rajin melatih fisik agar selalu siap', ne: 'नियमित शारीरिक तयारी गरी पूर्ण तयारीसाथ जान्छु', th: 'ออกกำลังกายสม่ำเสมอเพื่อพร้อมเสมอ' } },
      { label: { ja: '休憩をうまく使い、ペース配分を工夫する', vi: 'Tận dụng giờ nghỉ và phân bổ nhịp độ hợp lý', zh: '合理利用休息时间，调整节奏', tl: 'Gamitin nang maayos ang break at i-pace ang sarili', id: 'Memanfaatkan istirahat dan mengatur kecepatan', ne: 'विश्रामको सही प्रयोग गरी गति मिलाउँछु', th: 'ใช้เวลาพักอย่างเหมาะสมและจัดสรรจังหวะการทำงาน' } },
      { label: { ja: 'きつい日はきついが、仲間と声をかけ合って乗り越える', vi: 'Ngày nặng thì nặng, nhưng động viên nhau vượt qua', zh: '累的时候很累，但和同伴互相鼓励克服', tl: 'Mahirap pag mahirap, pero magtu-tulungan sa team', id: 'Hari berat memang berat, tapi saling menyemangati dengan rekan', ne: 'गाह्रो दिन गाह्रो नै हुन्छ, तर साथीहरूसँग हौसला दिँदै पार गर्छु', th: 'วันที่หนักก็หนัก แต่ให้กำลังใจกันในทีม' } },
      { label: { ja: '体力的にきつい仕事は長く続けられるか不安', vi: 'Lo lắng không thể làm lâu dài công việc nặng nhọc', zh: '担心体力繁重的工作能否长期坚持', tl: 'Nag-aalala kung kaya bang magtagal sa mabigat na trabaho', id: 'Khawatir apakah bisa bertahan lama di pekerjaan berat', ne: 'शारीरिक रूपमा कडा काम लामो समय गर्न सक्छु कि चिन्ता छ', th: 'กังวลว่าจะทำงานหนักได้นานหรือเปล่า' } },
    ],
  },
  {
    id: 20,
    text: {
      ja: '現場で先輩から「そのやり方は違う」と指摘されました。どう対応しますか？',
      vi: 'Tiền bối ở công trường nói "cách làm đó sai". Bạn phản ứng thế nào?',
      zh: '前辈在工地指出"你那样做不对"。您会怎么做？',
      tl: 'Sinabi ng senior sa site na "mali ang ginagawa mo". Paano ka tutugon?',
      id: 'Senior di lokasi mengatakan "cara kerjamu salah". Bagaimana Anda merespons?',
      ne: 'साइटमा सिनियरले "तिम्रो तरिका गलत छ" भन्नुभयो। कसरी प्रतिक्रिया गर्नुहुन्छ?',
      th: 'รุ่นพี่ที่ไซต์บอกว่า "วิธีทำแบบนั้นไม่ถูก" คุณจะตอบอย่างไร?',
    },
    choices: [
      { label: { ja: 'すぐにやめて、正しいやり方を教えてもらう', vi: 'Dừng ngay và nhờ chỉ cách đúng', zh: '马上停下，请教正确方法', tl: 'Ihinto agad at hingin ang tamang paraan', id: 'Segera berhenti dan minta diajarkan cara yang benar', ne: 'तुरुन्तै रोकेर सही तरिका सिक्छु', th: 'หยุดทันทีและขอให้สอนวิธีที่ถูกต้อง' } },
      { label: { ja: '理由を聞いて理解してから、やり方を変える', vi: 'Hỏi lý do, hiểu rồi mới thay đổi', zh: '询问原因理解后再改变方法', tl: 'Itanong ang dahilan, maintindihan bago baguhin', id: 'Menanyakan alasannya, memahami lalu mengubah cara', ne: 'कारण सोधेर बुझेर मात्र तरिका बदल्छु', th: 'ถามเหตุผล เข้าใจแล้วค่อยเปลี่ยนวิธี' } },
      { label: { ja: '言われた通りにするが、自分のやり方にも理由があったと思う', vi: 'Làm theo nhưng nghĩ cách mình cũng có lý', zh: '照做，但觉得自己的方法也有道理', tl: 'Susundin pero may dahilan din ang sariling paraan', id: 'Mengikuti, tapi merasa cara sendiri juga ada alasannya', ne: 'भनेजस्तै गर्छु, तर आफ्नो तरिकामा पनि कारण थियो', th: 'ทำตาม แต่คิดว่าวิธีของตัวเองก็มีเหตุผล' } },
      { label: { ja: '厳しく言われると少し萎縮してしまう', vi: 'Hơi sợ khi bị nói nghiêm khắc', zh: '被严厉指出会有点退缩', tl: 'Medyo natatakot kapag mahigpit ang pagsasabi', id: 'Agak ciut nyali ketika ditegur keras', ne: 'कडा भनिँदा अलि डराउँछु', th: 'ถ้าพูดรุนแรงจะรู้สึกเกร็งนิดหน่อย' } },
    ],
  },
];

// ===== 汎用（その他業種） =====
const general: IndustryQuestion[] = [
  {
    id: 16,
    text: {
      ja: '職場の安全ルールについて、どのように考えますか？',
      vi: 'Bạn nghĩ sao về các quy tắc an toàn tại nơi làm việc?',
      zh: '您如何看待工作场所的安全规则？',
      tl: 'Ano ang palagay mo sa safety rules sa trabaho?',
      id: 'Bagaimana pendapat Anda tentang aturan keselamatan di tempat kerja?',
      ne: 'कार्यस्थलको सुरक्षा नियमबारे तपाईंको के विचार छ?',
      th: 'คุณคิดอย่างไรกับกฎความปลอดภัยในที่ทำงาน?',
    },
    choices: [
      { label: { ja: '全員の命を守るもの。率先して守りたい', vi: 'Bảo vệ tính mạng mọi người. Muốn chủ động tuân thủ', zh: '保护所有人的生命。想带头遵守', tl: 'Proteksyon ng buhay ng lahat. Gusto kong maging una sa pagsunod', id: 'Melindungi nyawa semua orang. Ingin menjadi yang pertama mematuhi', ne: 'सबैको ज्यान जोगाउने कुरा। अगुवाइ गरी पालना गर्न चाहन्छु', th: 'ปกป้องชีวิตทุกคน อยากเป็นผู้นำในการปฏิบัติตาม' } },
      { label: { ja: '必要なこと。ルール通りに行動する', vi: 'Cần thiết. Hành động theo quy tắc', zh: '很有必要。按规则行动', tl: 'Kailangan. Kumilos ayon sa patakaran', id: 'Diperlukan. Bertindak sesuai aturan', ne: 'आवश्यक छ। नियमअनुसार काम गर्छु', th: 'จำเป็น ทำตามกฎ' } },
      { label: { ja: '大事だが、現場の状況に応じて柔軟にしたい', vi: 'Quan trọng nhưng muốn linh hoạt theo tình hình', zh: '重要但想根据现场情况灵活处理', tl: 'Mahalaga pero gusto ng flexibility depende sa sitwasyon', id: 'Penting tapi ingin fleksibel sesuai situasi', ne: 'महत्त्वपूर्ण छ तर परिस्थितिअनुसार लचिलो हुन चाहन्छु', th: 'สำคัญแต่อยากยืดหยุ่นตามสถานการณ์' } },
      { label: { ja: 'ルールが多すぎると感じることもある', vi: 'Đôi khi cảm thấy quá nhiều quy tắc', zh: '有时觉得规则太多', tl: 'Minsan pakiramdam ko masyadong maraming patakaran', id: 'Kadang merasa aturannya terlalu banyak', ne: 'कहिलेकाहीं नियम धेरै भएको महसुस हुन्छ', th: 'บางทีรู้สึกว่ากฎมากเกินไป' } },
    ],
  },
  {
    id: 17,
    text: {
      ja: '体力を使う作業について、どう感じますか？',
      vi: 'Bạn cảm thấy thế nào về công việc đòi hỏi thể lực?',
      zh: '对于需要体力的工作，您有何感受？',
      tl: 'Paano mo nararamdaman ang trabahong nangangailangan ng lakas?',
      id: 'Bagaimana perasaan Anda tentang pekerjaan yang membutuhkan tenaga?',
      ne: 'शारीरिक श्रम चाहिने कामबारे कस्तो लाग्छ?',
      th: 'คุณรู้สึกอย่างไรกับงานที่ต้องใช้แรงกาย?',
    },
    choices: [
      { label: { ja: '体を動かすのが好き。積極的に取り組みたい', vi: 'Thích vận động. Muốn tích cực tham gia', zh: '喜欢运动。想积极参与', tl: 'Gusto ng physical activity. Gustong maging aktibo', id: 'Suka bergerak. Ingin aktif berpartisipasi', ne: 'शरीर चलाउन मन पर्छ। सक्रिय रूपमा गर्न चाहन्छु', th: 'ชอบออกแรง อยากทำอย่างกระตือรือร้น' } },
      { label: { ja: '必要な体力は維持していきたい', vi: 'Muốn duy trì thể lực cần thiết', zh: '想保持必要的体力', tl: 'Gusto i-maintain ang kailangang lakas', id: 'Ingin menjaga kebugaran yang diperlukan', ne: 'आवश्यक शारीरिक क्षमता कायम राख्न चाहन्छु', th: 'อยากรักษาสมรรถภาพที่จำเป็น' } },
      { label: { ja: 'バランスよく体力仕事とデスクワークがあるといい', vi: 'Tốt nhất là cân bằng giữa lao động và văn phòng', zh: '体力活和案头工作平衡最好', tl: 'Maganda kung balanced ang physical at desk work', id: 'Sebaiknya seimbang antara pekerjaan fisik dan meja', ne: 'शारीरिक र डेस्क काम सन्तुलित भए राम्रो', th: 'ดีถ้ามีสมดุลระหว่างงานแรงกายและงานโต๊ะ' } },
      { label: { ja: 'できればデスクワークの方が得意', vi: 'Giỏi hơn ở công việc văn phòng', zh: '更擅长案头工作', tl: 'Mas magaling sa desk work', id: 'Lebih mahir di pekerjaan meja', ne: 'डेस्क काममा बढी दक्ष', th: 'ถนัดงานโต๊ะมากกว่า' } },
    ],
  },
  {
    id: 18,
    text: {
      ja: '仕事で使う道具や機器の扱いについて、どう思いますか？',
      vi: 'Bạn nghĩ sao về việc sử dụng dụng cụ và thiết bị trong công việc?',
      zh: '关于工作中使用工具和设备，您怎么看？',
      tl: 'Ano ang palagay mo sa paghawak ng mga tool at kagamitan sa trabaho?',
      id: 'Bagaimana pendapat Anda tentang penggunaan alat dan peralatan kerja?',
      ne: 'काममा प्रयोग हुने औजार र उपकरणको बारेमा के सोच्नुहुन्छ?',
      th: 'คุณคิดอย่างไรกับการใช้เครื่องมือและอุปกรณ์ในงาน?',
    },
    choices: [
      { label: { ja: '使い方をしっかり学び、丁寧に扱いたい', vi: 'Muốn học kỹ cách sử dụng và sử dụng cẩn thận', zh: '想认真学习使用方法，小心使用', tl: 'Gustong matuto nang maayos at mag-ingat sa paggamit', id: 'Ingin belajar cara pakai dengan baik dan menggunakannya hati-hati', ne: 'प्रयोग विधि राम्ररी सिकेर ध्यानपूर्वक प्रयोग गर्न चाहन्छु', th: 'อยากเรียนรู้วิธีใช้ให้ดีและใช้อย่างระมัดระวัง' } },
      { label: { ja: '基本を教わればすぐに使いこなせると思う', vi: 'Chỉ cần học cơ bản là dùng thành thạo ngay', zh: '学会基础就能很快上手', tl: 'Kapag natuto ng basics, kaya na agad', id: 'Kalau diajari dasar, bisa langsung mahir', ne: 'आधारभूत कुरा सिकेपछि छिट्टै प्रयोग गर्न सक्छु', th: 'เรียนพื้นฐานแล้วใช้ได้เลย' } },
      { label: { ja: '慣れるまでサポートがあると安心', vi: 'An tâm hơn nếu có hỗ trợ đến khi quen', zh: '有人指导到习惯比较放心', tl: 'Mas kampante kung may support hanggang masanay', id: 'Lebih tenang jika ada dukungan sampai terbiasa', ne: 'बानी नपरेसम्म सहयोग भए सुरक्षित', th: 'สบายใจถ้ามีคนช่วยจนกว่าจะชิน' } },
      { label: { ja: '機械や道具は少し苦手', vi: 'Hơi không giỏi về máy móc và dụng cụ', zh: '对机械和工具不太擅长', tl: 'Hindi masyadong magaling sa makina at tool', id: 'Kurang mahir dengan mesin dan peralatan', ne: 'मेसिन र औजारमा अलि कमजोर', th: 'ไม่ค่อยถนัดเครื่องมือและอุปกรณ์' } },
    ],
  },
  {
    id: 19,
    text: {
      ja: 'お客様や取引先と接する場面があったとき、どう対応しますか？',
      vi: 'Khi phải tiếp xúc với khách hàng hoặc đối tác, bạn ứng xử thế nào?',
      zh: '与客户或合作伙伴打交道时，您如何应对？',
      tl: 'Paano ka tumutugon kapag may interaction sa customer o business partner?',
      id: 'Bagaimana Anda merespons ketika berinteraksi dengan pelanggan atau mitra bisnis?',
      ne: 'ग्राहक वा व्यापार साझेदारसँग भेट्दा कसरी प्रतिक्रिया गर्नुहुन्छ?',
      th: 'เมื่อต้องพบปะลูกค้าหรือคู่ค้า คุณจะรับมืออย่างไร?',
    },
    choices: [
      { label: { ja: '笑顔と丁寧な対応を心がけ、良い印象を残したい', vi: 'Cố gắng nở nụ cười và ứng xử lịch sự, để lại ấn tượng tốt', zh: '注意微笑和礼貌，留下好印象', tl: 'Ngumiti at maging magalang, para magandang impression', id: 'Berusaha tersenyum dan sopan, meninggalkan kesan baik', ne: 'मुस्कान र शिष्ट व्यवहार गरी राम्रो छाप छोड्न चाहन्छु', th: 'ยิ้มแย้มและสุภาพ อยากสร้างความประทับใจที่ดี' } },
      { label: { ja: '基本的なマナーを守って対応する', vi: 'Ứng xử theo phép lịch sự cơ bản', zh: '遵守基本礼仪来应对', tl: 'Susundin ang basic na etiketa', id: 'Merespons dengan menjaga etika dasar', ne: 'आधारभूत शिष्टाचार पालना गरी व्यवहार गर्छु', th: 'ปฏิบัติตามมารยาทพื้นฐาน' } },
      { label: { ja: '緊張するが、経験を積めば慣れると思う', vi: 'Hồi hộp nhưng nghĩ sẽ quen khi có kinh nghiệm', zh: '会紧张，但觉得积累经验后会习惯', tl: 'Kinakabahan pero sa experience masasanay', id: 'Gugup tapi dengan pengalaman akan terbiasa', ne: 'तनाव हुन्छ तर अनुभव बढ्दा बानी पर्छ', th: 'ตื่นเต้นแต่คิดว่าจะชินเมื่อมีประสบการณ์' } },
      { label: { ja: '接客よりも裏方の仕事が好き', vi: 'Thích làm việc hậu trường hơn tiếp khách', zh: '比起接待客人更喜欢后台工作', tl: 'Mas gusto ang behind-the-scenes kaysa sa customer-facing', id: 'Lebih suka pekerjaan di belakang layar daripada melayani', ne: 'ग्राहक सेवाभन्दा पछाडिको काम मन पर्छ', th: 'ชอบงานเบื้องหลังมากกว่างานรับแขก' } },
    ],
  },
  {
    id: 20,
    text: {
      ja: 'この仕事で一番大切だと思うことは何ですか？',
      vi: 'Điều bạn cho là quan trọng nhất trong công việc này là gì?',
      zh: '您认为这份工作最重要的是什么？',
      tl: 'Ano ang pinakamahalaga sa trabahong ito para sa iyo?',
      id: 'Apa yang menurut Anda paling penting dalam pekerjaan ini?',
      ne: 'यस कामामा सबभन्दा महत्त्वपूर्ण कुरा के हो?',
      th: 'สิ่งที่คุณคิดว่าสำคัญที่สุดในงานนี้คืออะไร?',
    },
    choices: [
      { label: { ja: '安全に作業し、チームに貢献すること', vi: 'Làm việc an toàn và đóng góp cho nhóm', zh: '安全工作，为团队做贡献', tl: 'Mag-trabaho nang ligtas at mag-ambag sa team', id: 'Bekerja dengan aman dan berkontribusi pada tim', ne: 'सुरक्षित रूपमा काम गरी टोलीमा योगदान गर्नु', th: 'ทำงานอย่างปลอดภัยและมีส่วนร่วมในทีม' } },
      { label: { ja: '任された仕事を正確に最後までやり遂げること', vi: 'Hoàn thành chính xác công việc được giao đến cuối cùng', zh: '准确地完成分配的工作直到最后', tl: 'Tapusin nang tama ang ipinagkatiwala hanggang sa huli', id: 'Menyelesaikan pekerjaan yang dipercayakan dengan tepat sampai akhir', ne: 'सुम्पिएको काम शुद्ध रूपमा अन्त्यसम्म पूरा गर्नु', th: 'ทำงานที่ได้รับมอบหมายอย่างแม่นยำจนสำเร็จ' } },
      { label: { ja: 'スキルを身につけて成長すること', vi: 'Rèn luyện kỹ năng và phát triển', zh: '学习技能并成长', tl: 'Matuto ng skills at lumago', id: 'Mempelajari keterampilan dan berkembang', ne: 'सीप सिकेर विकास गर्नु', th: 'เรียนรู้ทักษะและเติบโต' } },
      { label: { ja: '安定した収入を得ること', vi: 'Có thu nhập ổn định', zh: '获得稳定的收入', tl: 'Magkaroon ng matatag na kita', id: 'Mendapatkan penghasilan yang stabil', ne: 'स्थिर आम्दानी पाउनु', th: 'มีรายได้ที่มั่นคง' } },
    ],
  },
];

// 業種コード → 質問データのマッピング
const INDUSTRY_QUESTIONS: Record<string, IndustryQuestion[]> = {
  manufacturing,
  care,
  construction,
  agriculture: general, // 農業は汎用を使用（後日追加可能）
  hospitality: general,  // 宿泊・飲食は汎用を使用（後日追加可能）
  cleaning: general,     // 清掃は汎用を使用（後日追加可能）
  general,
};

export function getIndustryQuestions(industryCode: string): IndustryQuestion[] {
  return INDUSTRY_QUESTIONS[industryCode] || general;
}
