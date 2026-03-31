// Hana 採用前特性テスト v3
// 15問・5軸（協調性・誠実性・適応力・積極性・ストレス耐性）
// スコアリング: [5, 3, 1, 0] でコントラスト強化
// + 業種別5問（Q16-Q20）は industry-questions.ts から動的に読み込み

export type Language = 'ja' | 'vi' | 'zh' | 'tl' | 'id' | 'ne' | 'th';

export type Axis = 'agreeableness' | 'conscientiousness' | 'adaptability' | 'proactivity' | 'stressTolerance';

export interface Choice {
  label: Record<Language, string>;
}

export interface Question {
  id: number;
  axis: Axis;
  text: Record<Language, string>;
  choices: [Choice, Choice, Choice, Choice]; // スコア順: 5, 3, 1, 0
}

export const LANGUAGES: { code: Language; flag: string; name: string }[] = [
  { code: 'ja', flag: '🇯🇵', name: '日本語' },
  { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
  { code: 'zh', flag: '🇨🇳', name: '中文' },
  { code: 'tl', flag: '🇵🇭', name: 'Tagalog' },
  { code: 'id', flag: '🇮🇩', name: 'Bahasa Indonesia' },
  { code: 'ne', flag: '🇳🇵', name: 'नेपाली' },
  { code: 'th', flag: '🇹🇭', name: 'ภาษาไทย' },
];

export const AXIS_LABELS: Record<Axis, Record<Language, string>> = {
  agreeableness: {
    ja: '協調性', vi: 'Tính hòa đồng', zh: '协调性',
    tl: 'Pagkamaayon', id: 'Kecocokan', ne: 'सहमतिशीलता', th: 'ความเห็นอกเห็นใจ',
  },
  conscientiousness: {
    ja: '誠実性', vi: 'Tính tận tâm', zh: '诚实性',
    tl: 'Katapatan', id: 'Kesungguhan', ne: 'इमानदारी', th: 'ความซื่อสัตย์',
  },
  adaptability: {
    ja: '適応力', vi: 'Khả năng thích ứng', zh: '适应力',
    tl: 'Kakayahang umangkop', id: 'Kemampuan beradaptasi', ne: 'अनुकूलन क्षमता', th: 'ความสามารถในการปรับตัว',
  },
  proactivity: {
    ja: '積極性', vi: 'Tính chủ động', zh: '积极性',
    tl: 'Pagiging aktibo', id: 'Keproaktifan', ne: 'सक्रियता', th: 'ความกระตือรือร้น',
  },
  stressTolerance: {
    ja: 'ストレス耐性', vi: 'Khả năng chịu áp lực', zh: '抗压能力',
    tl: 'Kakayahang makayanan ang stress', id: 'Ketahanan terhadap stres',
    ne: 'तनाव सहनशीलता', th: 'ความทนทานต่อความเครียด',
  },
};

export const questions: Question[] = [
  // ===== Q1〜Q3: 協調性 (Agreeableness) =====
  {
    id: 1, axis: 'agreeableness',
    text: {
      ja: '困っている同僚がいたとき、あなたはどうしますか？',
      vi: 'Khi đồng nghiệp gặp khó khăn, bạn thường làm gì?',
      zh: '当同事遇到困难时，您通常会怎么做？',
      tl: 'Kapag may katrabahong nahihirapan, ano ang ginagawa mo?',
      id: 'Saat rekan kerja Anda mengalami kesulitan, apa yang biasanya Anda lakukan?',
      ne: 'जब कुनै सहकर्मी कठिनाइमा पर्नुहुन्छ, तपाईं सामान्यतः के गर्नुहुन्छ?',
      th: 'เมื่อเพื่อนร่วมงานมีปัญหา คุณมักทำอะไร?',
    },
    choices: [
      { label: { ja: '自分の仕事を調整してでも「手伝おうか」と声をかける', vi: 'Điều chỉnh công việc của mình để hỏi "Tôi giúp được gì không?"', zh: '调整自己的工作，主动问"需要帮忙吗？"', tl: 'Iaadjust ang sariling trabaho para itanong "Kailangan mo ba ng tulong?"', id: 'Menyesuaikan pekerjaan sendiri untuk menawarkan bantuan', ne: 'आफ्नो काम मिलाएर "मद्दत गरौं?" भनेर सोध्छु', th: 'ปรับงานตัวเองเพื่อเอ่ยปากถามว่า "ช่วยอะไรได้ไหม?"' } },
      { label: { ja: '相手の様子を見て、困っていそうなら声をかける', vi: 'Quan sát và hỏi thăm nếu thấy họ gặp khó khăn', zh: '观察对方，看起来有困难就上前询问', tl: 'Pagmamasdan muna, kakausapin kung mukhang nahihirapan', id: 'Mengamati situasi, menawarkan bantuan jika terlihat kesulitan', ne: 'अवस्था हेरेर, गाह्रो देखिए सोध्छु', th: 'สังเกตดูก่อน ถ้าเห็นว่าลำบากจะเข้าไปถาม' } },
      { label: { ja: '聞かれたら手伝うが、自分からは声をかけないタイプ', vi: 'Sẽ giúp nếu được hỏi, nhưng không chủ động hỏi', zh: '被问到就帮忙，但不会主动询问', tl: 'Tutulong kung hihilingin, pero hindi unang magtanong', id: 'Membantu jika diminta, tapi tidak menawarkan duluan', ne: 'सोधे मद्दत गर्छु, तर आफैं सोध्दिन', th: 'ช่วยถ้าถูกถาม แต่ไม่ใช่คนที่จะถามก่อน' } },
      { label: { ja: 'まず自分の仕事を終わらせる。相手も自分で解決したいかもしれない', vi: 'Hoàn thành việc mình trước. Họ có thể muốn tự giải quyết', zh: '先完成自己的工作。对方可能也想自己解决', tl: 'Tatapusin muna ang sariling trabaho. Baka gusto nilang ayusin nila mismo', id: 'Menyelesaikan pekerjaan sendiri dulu. Mereka mungkin ingin menyelesaikan sendiri', ne: 'पहिले आफ्नो काम सिद्ध्याउँछु। उनी पनि आफैं समाधान गर्न चाहन्छन् होला', th: 'ทำงานตัวเองให้เสร็จก่อน เขาอาจอยากแก้ปัญหาเอง' } },
    ],
  },
  {
    id: 2, axis: 'agreeableness',
    text: {
      ja: 'チームの決定が自分の意見と違うとき、どうしますか？',
      vi: 'Khi quyết định của nhóm khác ý kiến của bạn, bạn sẽ làm gì?',
      zh: '当团队决策与您的意见不同时，您会怎么做？',
      tl: 'Kapag ang desisyon ng grupo ay iba sa iyong opinyon, ano ang gagawin mo?',
      id: 'Ketika keputusan tim berbeda dengan pendapat Anda, apa yang akan Anda lakukan?',
      ne: 'टोलीको निर्णय तपाईंको मतसँग फरक भएमा के गर्नुहुन्छ?',
      th: 'เมื่อการตัดสินใจของทีมแตกต่างจากความเห็นของคุณ คุณจะทำอย่างไร?',
    },
    choices: [
      { label: { ja: '自分の考えを共有した上で、チームの結論に合わせる', vi: 'Chia sẻ ý kiến rồi đồng ý với kết luận của nhóm', zh: '分享自己的想法后，配合团队的结论', tl: 'Ibabahagi ang opinyon, tapos susunod sa desisyon ng grupo', id: 'Menyampaikan pendapat lalu mengikuti keputusan tim', ne: 'आफ्नो विचार राखेर टोलीको निष्कर्ष मान्छु', th: 'แบ่งปันความคิดแล้วปฏิบัติตามข้อสรุปของทีม' } },
      { label: { ja: 'まずチームの方針で動き、気になる点は後から相談する', vi: 'Làm theo nhóm trước, hỏi thêm sau nếu có thắc mắc', zh: '先按团队方针行动，有疑虑之后再商量', tl: 'Sundin muna ang grupo, tapos i-raise ang concern mamaya', id: 'Mengikuti arahan tim dulu, konsultasi belakangan jika ada kekhawatiran', ne: 'पहिले टोलीको योजनामा लाग्छु, पछि चासो लागेका कुरा छलफल गर्छु', th: 'ทำตามทีมก่อน แล้วค่อยปรึกษาทีหลังถ้ามีข้อสงสัย' } },
      { label: { ja: '納得できるまで理由を確認してから行動に移す', vi: 'Xác nhận lý do cho đến khi hiểu rõ rồi mới hành động', zh: '确认原因直到理解为止，然后再行动', tl: 'Kumpirmahin ang dahilan hanggang maging satisfied bago kumilos', id: 'Mengonfirmasi alasan sampai paham, baru bertindak', ne: 'बुझ्ने नभएसम्म कारण बुझेर मात्र काम गर्छु', th: 'ยืนยันเหตุผลจนเข้าใจก่อนจึงลงมือทำ' } },
      { label: { ja: '自分なりのやり方も並行して試してみる', vi: 'Song song thử cách làm của riêng mình', zh: '同时尝试自己的方法', tl: 'Subukan din ang sariling paraan kasabay', id: 'Mencoba cara sendiri secara bersamaan', ne: 'आफ्नो तरिका पनि समानान्तर रूपमा प्रयास गर्छु', th: 'ลองวิธีของตัวเองไปพร้อมกันด้วย' } },
    ],
  },
  {
    id: 3, axis: 'agreeableness',
    text: {
      ja: '言葉が通じにくい同僚と一緒に作業することになったら？',
      vi: 'Nếu phải làm việc cùng đồng nghiệp khó giao tiếp vì ngôn ngữ?',
      zh: '如果要和语言不通的同事一起工作，您会怎样？',
      tl: 'Kung kailangan mong magtrabaho kasama ang isang kasamang mahirap kausapin dahil sa wika?',
      id: 'Jika Anda harus bekerja bersama rekan yang sulit berkomunikasi karena bahasa?',
      ne: 'भाषा बुझ्न गाह्रो हुने सहकर्मीसँग काम गर्नुपर्दा?',
      th: 'ถ้าต้องทำงานกับเพื่อนร่วมงานที่สื่อสารทางภาษาได้ยาก?',
    },
    choices: [
      { label: { ja: '翻訳アプリやジェスチャーなど工夫して積極的にやり取りする', vi: 'Tích cực giao tiếp bằng ứng dụng dịch, cử chỉ, v.v.', zh: '用翻译软件、手势等积极沟通', tl: 'Aktibong makipag-usap gamit ang translator app, gestures, atbp.', id: 'Aktif berkomunikasi dengan aplikasi penerjemah, gestur, dll.', ne: 'अनुवाद एप र इशाराहरू प्रयोग गरी सक्रिय रूपमा कुराकानी गर्छु', th: 'สื่อสารอย่างกระตือรือร้นด้วยแอปแปลภาษา ท่าทาง ฯลฯ' } },
      { label: { ja: '必要な情報は伝え合い、少しずつ関係を築いていく', vi: 'Trao đổi thông tin cần thiết, từ từ xây dựng mối quan hệ', zh: '交流必要的信息，慢慢建立关系', tl: 'Magpalitan ng kinakailangang impormasyon, unti-unting bumuo ng relasyon', id: 'Bertukar informasi penting, perlahan membangun hubungan', ne: 'आवश्यक जानकारी आदानप्रदान गरी बिस्तारै सम्बन्ध बनाउँछु', th: 'สื่อสารข้อมูลที่จำเป็นและค่อยๆ สร้างความสัมพันธ์' } },
      { label: { ja: '仕事に必要なやり取りを丁寧に行う', vi: 'Giao tiếp những gì cần cho công việc một cách cẩn thận', zh: '认真进行工作所需的沟通', tl: 'Maingat na makipag-usap para sa mga kailangan sa trabaho', id: 'Melakukan komunikasi yang diperlukan untuk pekerjaan dengan cermat', ne: 'कामका लागि आवश्यक कुराकानी ध्यानपूर्वक गर्छु', th: 'สื่อสารเรื่องงานที่จำเป็นอย่างรอบคอบ' } },
      { label: { ja: 'お互いの得意分野で分担して、効率よく進める', vi: 'Phân công theo thế mạnh của mỗi người, làm việc hiệu quả', zh: '按各自擅长的领域分工，高效推进', tl: 'Hatiin ang trabaho ayon sa lakas ng bawat isa, gawin nang mahusay', id: 'Membagi tugas sesuai keahlian masing-masing, bekerja efisien', ne: 'आ-आफ्नो क्षमताअनुसार बाँडेर कुशलतापूर्वक अगाडि बढ्छु', th: 'แบ่งงานตามจุดแข็งของกันและกัน ทำงานอย่างมีประสิทธิภาพ' } },
    ],
  },

  // ===== Q4〜Q6: 誠実性 (Conscientiousness) =====
  {
    id: 4, axis: 'conscientiousness',
    text: {
      ja: '約束した時間に遅れそうなとき、どうしますか？',
      vi: 'Khi có nguy cơ đến trễ giờ hẹn, bạn làm gì?',
      zh: '当您可能会迟到时，您会怎么做？',
      tl: 'Kapag maaaring mahuli ka sa usapang oras, ano ang gagawin mo?',
      id: 'Saat Anda mungkin terlambat dari waktu yang dijanjikan, apa yang Anda lakukan?',
      ne: 'तोकिएको समयमा ढिला हुने सम्भावना भएमा के गर्नुहुन्छ?',
      th: 'เมื่อคุณอาจจะมาสายกว่าที่นัด คุณจะทำอย่างไร?',
    },
    choices: [
      { label: { ja: 'わかった時点ですぐ連絡し、到着予定を正確に伝える', vi: 'Liên lạc ngay khi biết và thông báo chính xác giờ đến', zh: '一发现就立即联系，准确告知到达时间', tl: 'Makikipag-ugnayan agad at sasabihin ang tamang oras ng dating', id: 'Segera menghubungi dan memberitahu waktu kedatangan yang tepat', ne: 'थाहा भएपछि तुरुन्तै सम्पर्क गरी पुग्ने समय जनाउँछु', th: 'ติดต่อทันทีที่รู้และบอกเวลาที่จะไปถึงอย่างแม่นยำ' } },
      { label: { ja: 'できるだけ急いで向かい、間に合わなければ連絡する', vi: 'Cố gắng đến nhanh nhất, liên lạc nếu không kịp', zh: '尽量赶去，来不及的话就联系', tl: 'Bilisan hangga\'t maaari, makikipag-ugnayan kung hindi maaabot', id: 'Berusaha datang secepat mungkin, menghubungi jika tidak sempat', ne: 'सकेसम्म छिटो जान्छु, नपुगे सम्पर्क गर्छु', th: 'รีบไปให้เร็วที่สุด ถ้าไม่ทันจะติดต่อ' } },
      { label: { ja: '到着してからきちんと事情を説明する', vi: 'Đến nơi rồi giải thích rõ lý do', zh: '到达后认真说明情况', tl: 'Pagdating, ipaliwanag nang maayos ang dahilan', id: 'Menjelaskan situasi dengan baik setelah tiba', ne: 'पुगेपछि राम्ररी कारण बताउँछु', th: 'อธิบายเหตุผลอย่างเรียบร้อยเมื่อถึง' } },
      { label: { ja: '少しくらいの遅れなら仕方がないと思う', vi: 'Nghĩ rằng trễ một chút cũng không sao', zh: '觉得稍微迟到一点也没办法', tl: 'Okay lang kung konting late', id: 'Merasa terlambat sedikit tidak apa-apa', ne: 'थोरै ढिलो भए पनि बिचार गर्दिन', th: 'คิดว่าสายนิดหน่อยก็ไม่เป็นไร' } },
    ],
  },
  {
    id: 5, axis: 'conscientiousness',
    text: {
      ja: '誰も見ていないとき、職場のルールをどう扱いますか？',
      vi: 'Khi không có ai nhìn, bạn đối xử với nội quy công ty như thế nào?',
      zh: '没有人监督时，您如何对待公司规定？',
      tl: 'Kapag walang nakakakita, paano mo tinatrato ang mga patakaran sa trabaho?',
      id: 'Saat tidak ada yang melihat, bagaimana Anda memperlakukan peraturan perusahaan?',
      ne: 'कसैले नहेर्दा, तपाईं कम्पनीको नियमलाई कसरी व्यवहार गर्नुहुन्छ?',
      th: 'เมื่อไม่มีใครมองดู คุณปฏิบัติต่อกฎระเบียบของบริษัทอย่างไร?',
    },
    choices: [
      { label: { ja: '人が見ていなくても同じように守る', vi: 'Tuân thủ như bình thường dù không ai nhìn', zh: '即使没人看也一样遵守', tl: 'Sinusunod pa rin kahit walang nakakakita', id: 'Tetap mematuhi seperti biasa meski tidak dilihat', ne: 'कसैले नहेरे पनि उस्तै रूपमा पालना गर्छु', th: 'ปฏิบัติตามเหมือนเดิมแม้ไม่มีใครดู' } },
      { label: { ja: '基本的には守るが、効率のために少し変えることもある', vi: 'Cơ bản tuân thủ, nhưng đôi khi thay đổi nhỏ để hiệu quả hơn', zh: '基本遵守，但有时为了效率会稍作调整', tl: 'Karamihan sinusunod, pero minsan binabago nang kaunti para maging mas epektibo', id: 'Pada dasarnya mematuhi, tapi kadang sedikit berubah untuk efisiensi', ne: 'सामान्यतः पालना गर्छु, तर कुशलताका लागि केही बदल्छु', th: 'โดยทั่วไปปฏิบัติตาม แต่บางครั้งปรับเล็กน้อยเพื่อประสิทธิภาพ' } },
      { label: { ja: '重要なルールは守るが、細かいものは場合による', vi: 'Tuân thủ quy tắc quan trọng, linh hoạt với quy tắc nhỏ', zh: '重要规则会遵守，小规则视情况而定', tl: 'Sinusunod ang mahahalagang patakaran, depende sa maliliit', id: 'Mematuhi aturan penting, fleksibel untuk yang kecil', ne: 'महत्त्वपूर्ण नियम पालना गर्छु, सानातिना अवस्थाअनुसार', th: 'ปฏิบัติตามกฎสำคัญ แต่กฎย่อยแล้วแต่สถานการณ์' } },
      { label: { ja: 'ルールの目的を理解した上で、自分で判断する', vi: 'Hiểu mục đích của quy tắc và tự quyết định', zh: '理解规则目的后，自行判断', tl: 'Unawain ang layunin ng patakaran at pagpasyahan nang sarili', id: 'Memahami tujuan aturan dan memutuskan sendiri', ne: 'नियमको उद्देश्य बुझेर आफैं निर्णय गर्छु', th: 'เข้าใจจุดประสงค์ของกฎแล้วตัดสินใจเอง' } },
    ],
  },
  {
    id: 6, axis: 'conscientiousness',
    text: {
      ja: '仕事でミスをしたとき、最初にどうしますか？',
      vi: 'Khi mắc lỗi trong công việc, việc đầu tiên bạn làm là gì?',
      zh: '工作出错时，您首先会怎么做？',
      tl: 'Kapag nagkamali sa trabaho, ano ang unang gagawin mo?',
      id: 'Saat membuat kesalahan dalam pekerjaan, apa yang pertama Anda lakukan?',
      ne: 'काममा गल्ती भएमा, पहिले के गर्नुहुन्छ?',
      th: 'เมื่อทำงานผิดพลาด สิ่งแรกที่คุณทำคืออะไร?',
    },
    choices: [
      { label: { ja: '小さなミスでもすぐに報告し、対応を相談する', vi: 'Báo cáo ngay cả lỗi nhỏ và tham khảo cách xử lý', zh: '即使是小错误也立即报告，商量应对方法', tl: 'Kahit maliit na pagkakamali, ire-report agad at hihingi ng payo', id: 'Melaporkan meskipun kesalahan kecil dan konsultasi penanganannya', ne: 'सानो गल्ती भए पनि तुरुन्तै रिपोर्ट गरी समाधान सल्लाह गर्छु', th: 'รายงานทันทีแม้เป็นข้อผิดพลาดเล็กน้อยและปรึกษาการแก้ไข' } },
      { label: { ja: '自分で修正できるか確認し、直してから報告する', vi: 'Kiểm tra xem có thể tự sửa không, sửa xong mới báo cáo', zh: '确认能否自己修正，修好后再报告', tl: 'Tingnan kung kaya bang ayusin, ayusin muna bago mag-report', id: 'Memeriksa apakah bisa diperbaiki sendiri, memperbaiki lalu melapor', ne: 'आफैं ठिक गर्न सकिन्छ कि हेर्छु, ठिक गरेर रिपोर्ट गर्छु', th: 'ตรวจสอบว่าแก้ไขเองได้ไหม แก้แล้วค่อยรายงาน' } },
      { label: { ja: '影響の大きさを見て、報告するかどうか判断する', vi: 'Đánh giá mức ảnh hưởng để quyết định có báo cáo hay không', zh: '看影响大小，判断是否需要报告', tl: 'Tingnan ang laki ng epekto para magdesisyon kung ire-report', id: 'Melihat besarnya dampak untuk memutuskan perlu dilaporkan atau tidak', ne: 'प्रभावको मात्रा हेरेर रिपोर्ट गर्ने कि नगर्ने निर्णय गर्छु', th: 'ดูขนาดผลกระทบเพื่อตัดสินใจว่าจะรายงานหรือไม่' } },
      { label: { ja: 'まず自分で解決を試みる。自力で直せれば問題ない', vi: 'Cố tự giải quyết trước. Nếu sửa được thì không sao', zh: '先自己尝试解决。能自己修好就没问题', tl: 'Subukang ayusin muna. Kung naayos, walang problema', id: 'Mencoba menyelesaikan sendiri dulu. Kalau bisa diperbaiki, tidak masalah', ne: 'पहिले आफैं समाधान गर्ने प्रयास गर्छु। ठिक भए समस्या छैन', th: 'ลองแก้ไขเองก่อน ถ้าแก้ได้ก็ไม่มีปัญหา' } },
    ],
  },

  // ===== Q7〜Q9: 適応力 (Adaptability) =====
  {
    id: 7, axis: 'adaptability',
    text: {
      ja: '日本の職場文化（礼儀・報連相など）についてどう思いますか？',
      vi: 'Bạn nghĩ sao về văn hóa làm việc Nhật Bản (lễ nghi, báo cáo liên lạc)?',
      zh: '您如何看待日本职场文化（礼仪、汇报联络商量等）？',
      tl: 'Ano ang palagay mo sa kulturang pampalakasan ng Hapon (etiketa, pag-uulat, pagkonsulta)?',
      id: 'Apa pendapat Anda tentang budaya kerja Jepang (etika, laporan-konsultasi-koordinasi)?',
      ne: 'जापानी कार्यस्थल संस्कृति (शिष्टाचार, रिपोर्टिङ) बारे तपाईंको के विचार छ?',
      th: 'คุณคิดอย่างไรกับวัฒนธรรมการทำงานของญี่ปุ่น (มารยาท การรายงาน การปรึกษา)?',
    },
    choices: [
      { label: { ja: '背景を理解して自分の働き方に取り入れたい', vi: 'Muốn hiểu lý do và áp dụng vào cách làm việc của mình', zh: '想了解背景并融入自己的工作方式', tl: 'Gustong maintindihan ang background at isama sa sariling paraan ng pagtatrabaho', id: 'Ingin memahami latar belakangnya dan menerapkan dalam cara kerja sendiri', ne: 'पृष्ठभूमि बुझेर आफ्नो कार्यशैलीमा अपनाउन चाहन्छु', th: 'อยากเข้าใจที่มาที่ไปและนำไปใช้ในการทำงานของตัวเอง' } },
      { label: { ja: '慣れるまで時間はかかるが、学んでいきたい', vi: 'Cần thời gian để quen, nhưng muốn học hỏi', zh: '虽然需要时间适应，但愿意学习', tl: 'Kailangan ng oras para masanay, pero gustong matuto', id: 'Butuh waktu untuk terbiasa, tapi ingin belajar', ne: 'बसन समय लाग्छ तर सिक्दै जान चाहन्छु', th: 'ต้องใช้เวลาในการปรับตัว แต่อยากเรียนรู้' } },
      { label: { ja: '大切な部分は取り入れつつ、自分の文化も活かしたい', vi: 'Tiếp thu phần quan trọng và giữ văn hóa riêng', zh: '吸收重要的部分，同时保留自己的文化', tl: 'Kunin ang mahahalagang bahagi at gamitin din ang sariling kultura', id: 'Mengadopsi bagian penting sambil mempertahankan budaya sendiri', ne: 'महत्त्वपूर्ण भाग अपनाउँदै आफ्नो संस्कृति पनि प्रयोग गर्न चाहन्छु', th: 'รับเอาส่วนสำคัญมาและใช้วัฒนธรรมของตัวเองด้วย' } },
      { label: { ja: '仕事の成果が出ていれば、形式にこだわる必要は少ないと思う', vi: 'Nếu kết quả tốt thì không cần quá quan tâm hình thức', zh: '如果工作成果好，就不必太拘泥于形式', tl: 'Kung maganda ang resulta ng trabaho, hindi na kailangang mag-focus sa formalidad', id: 'Jika hasil kerja bagus, tidak perlu terlalu mementingkan formalitas', ne: 'काममा नतिजा आइरहेको छ भने, औपचारिकतामा बढी ध्यान दिनुपर्दैन', th: 'ถ้าผลงานดี ไม่จำเป็นต้องยึดติดกับรูปแบบมากนัก' } },
    ],
  },
  {
    id: 8, axis: 'adaptability',
    text: {
      ja: '仕事のやり方が突然変わったとき、どのように対応しますか？',
      vi: 'Khi cách làm việc thay đổi đột ngột, bạn ứng phó thế nào?',
      zh: '当工作方式突然改变时，您如何应对？',
      tl: 'Paano ka mag-aayos kapag biglang nagbago ang paraan ng trabaho?',
      id: 'Bagaimana Anda merespons ketika cara kerja berubah tiba-tiba?',
      ne: 'काम गर्ने तरिका अचानक बदलिएमा कसरी प्रतिक्रिया गर्नुहुन्छ?',
      th: 'เมื่อวิธีการทำงานเปลี่ยนแปลงอย่างกะทันหัน คุณรับมืออย่างไร?',
    },
    choices: [
      { label: { ja: '新しいやり方をまず試してみて、良い点を見つける', vi: 'Thử cách mới trước và tìm điểm tốt', zh: '先尝试新方法，寻找优点', tl: 'Subukan muna ang bagong paraan at hanapin ang magandang punto', id: 'Mencoba cara baru dulu dan menemukan kelebihannya', ne: 'पहिले नयाँ तरिका प्रयास गरी राम्रा पक्ष खोज्छु', th: 'ลองวิธีใหม่ก่อนและหาข้อดี' } },
      { label: { ja: '変更の理由を聞いてから、前向きに取り組む', vi: 'Hỏi lý do thay đổi rồi tích cực thực hiện', zh: '了解变更原因后积极执行', tl: 'Itanong ang dahilan ng pagbabago, tapos gawin nang positibo', id: 'Menanyakan alasan perubahan, lalu bekerja secara positif', ne: 'परिवर्तनको कारण सोधेर, सकारात्मक रूपमा काम गर्छु', th: 'ถามเหตุผลที่เปลี่ยนแล้วทำอย่างสร้างสรรค์' } },
      { label: { ja: '慣れるまで少し時間をもらいたい', vi: 'Muốn có thời gian để quen dần', zh: '希望给一点时间来适应', tl: 'Gusto ng kaunting oras para masanay', id: 'Ingin diberi sedikit waktu untuk terbiasa', ne: 'बस्न अलि समय चाहिन्छ', th: 'อยากได้เวลาสักหน่อยเพื่อปรับตัว' } },
      { label: { ja: '前のやり方が良かった理由を伝えたい', vi: 'Muốn nói lý do cách cũ tốt hơn', zh: '想说明以前的方法更好的原因', tl: 'Gustong ipaliwanag kung bakit mas maganda ang lumang paraan', id: 'Ingin menyampaikan alasan mengapa cara lama lebih baik', ne: 'पहिलेको तरिका राम्रो भएको कारण बताउन चाहन्छु', th: 'อยากบอกเหตุผลที่วิธีเดิมดีกว่า' } },
    ],
  },
  {
    id: 9, axis: 'adaptability',
    text: {
      ja: '知らない業務を任されたとき、どうしますか？',
      vi: 'Khi được giao công việc chưa biết, bạn làm gì?',
      zh: '被分配不熟悉的工作时，您会怎么做？',
      tl: 'Kapag ibinigay sa iyo ang trabahong hindi mo alam, ano ang gagawin mo?',
      id: 'Saat diberi pekerjaan yang belum pernah dilakukan, apa yang Anda lakukan?',
      ne: 'थाहा नभएको काम सुम्पिएमा के गर्नुहुन्छ?',
      th: 'เมื่อได้รับมอบหมายงานที่ไม่รู้จัก คุณจะทำอย่างไร?',
    },
    choices: [
      { label: { ja: 'まず自分で調べてから、わからない点を具体的に質問する', vi: 'Tự tìm hiểu trước, rồi hỏi cụ thể những điểm chưa rõ', zh: '先自己查找，再具体询问不明白的地方', tl: 'Mag-research muna, tapos magtanong ng mga specific na hindi maintindihan', id: 'Mencari tahu sendiri dulu, lalu bertanya spesifik tentang yang belum jelas', ne: 'पहिले आफैं खोजेर, नबुझेको कुरा विशेष रूपमा सोध्छु', th: 'ศึกษาด้วยตัวเองก่อน แล้วถามเฉพาะจุดที่ไม่เข้าใจ' } },
      { label: { ja: '詳しい人に教えてもらいながら進める', vi: 'Nhờ người có kinh nghiệm hướng dẫn và làm theo', zh: '请有经验的人指导，边学边做', tl: 'Mag-paturo sa may alam habang ginagawa', id: 'Minta orang yang berpengalaman mengajari sambil bekerja', ne: 'अनुभवी व्यक्तिसँग सिक्दै काम गर्छु', th: 'ให้คนที่มีประสบการณ์สอนไปพร้อมกับทำ' } },
      { label: { ja: 'やり方を一通り教えてもらってから取りかかる', vi: 'Được hướng dẫn đầy đủ trước rồi mới bắt đầu', zh: '先请人全面教一遍再开始', tl: 'Mag-pa-aral ng buong proseso bago magsimula', id: 'Meminta diajarkan prosesnya terlebih dahulu baru mulai', ne: 'पहिले सबै तरिका सिकेर मात्र काम सुरु गर्छु', th: 'เรียนรู้ขั้นตอนทั้งหมดก่อนแล้วค่อยเริ่ม' } },
      { label: { ja: '自分の得意な業務と交換できないか相談する', vi: 'Thương lượng đổi sang công việc mình giỏi hơn', zh: '商量能否换成自己擅长的工作', tl: 'Makipag-usap kung pwedeng palitan ng trabahong alam ko', id: 'Berdiskusi apakah bisa ditukar dengan pekerjaan yang dikuasai', ne: 'आफ्नो दक्ष कामसँग साट्न सकिन्छ कि भनेर सल्लाह गर्छु', th: 'ปรึกษาว่าเปลี่ยนเป็นงานที่ถนัดได้ไหม' } },
    ],
  },

  // ===== Q10〜Q12: 積極性 (Proactivity) =====
  {
    id: 10, axis: 'proactivity',
    text: {
      ja: '仕事中に「もっと良い方法がある」と気づいたとき、どうしますか？',
      vi: 'Khi nhận ra có cách làm việc tốt hơn, bạn sẽ làm gì?',
      zh: '发现更好的工作方法时，您会怎么做？',
      tl: 'Kapag napansin mong may mas magandang paraan ng trabaho, ano ang gagawin mo?',
      id: 'Saat Anda menyadari ada cara yang lebih baik dalam pekerjaan, apa yang Anda lakukan?',
      ne: 'काम गर्दा \'अझ राम्रो तरिका छ\' भन्ने थाहा भएमा के गर्नुहुन्छ?',
      th: 'เมื่อคุณตระหนักว่ามีวิธีที่ดีกว่าในการทำงาน คุณจะทำอย่างไร?',
    },
    choices: [
      { label: { ja: '具体的な改善案をまとめて上司に提案する', vi: 'Tổng hợp đề xuất cải tiến cụ thể và trình lên cấp trên', zh: '整理具体改善方案后向上级提议', tl: 'Buuin ang konkretong improvement plan at imungkahi sa boss', id: 'Menyusun proposal perbaikan konkret dan mengusulkan ke atasan', ne: 'ठोस सुधार योजना बनाएर माथिल्लो अधिकारीलाई प्रस्ताव गर्छु', th: 'รวบรวมข้อเสนอปรับปรุงที่เป็นรูปธรรมแล้วเสนอหัวหน้า' } },
      { label: { ja: 'まず同僚に話して反応を見てから判断する', vi: 'Nói với đồng nghiệp trước, xem phản ứng rồi quyết định', zh: '先跟同事聊聊看反应再决定', tl: 'Kausapin muna ang katrabaho, tingnan ang reaksyon bago magpasya', id: 'Membicarakan dengan rekan kerja dulu, melihat reaksi sebelum memutuskan', ne: 'पहिले सहकर्मीसँग कुरा गरी प्रतिक्रिया हेरेर निर्णय गर्छु', th: 'คุยกับเพื่อนร่วมงานก่อนดูปฏิกิริยาแล้วจึงตัดสินใจ' } },
      { label: { ja: '自分の作業では新しい方法を試してみる', vi: 'Thử cách mới cho công việc của mình', zh: '在自己的工作中试用新方法', tl: 'Subukan ang bagong paraan sa sariling trabaho', id: 'Mencoba cara baru dalam pekerjaan sendiri', ne: 'आफ्नो कामामा नयाँ तरिका प्रयास गर्छु', th: 'ลองวิธีใหม่ในงานของตัวเอง' } },
      { label: { ja: '指示された方法をまず確実にこなすことを優先する', vi: 'Ưu tiên hoàn thành tốt phương pháp đã được chỉ dẫn', zh: '优先按照指示的方法认真完成', tl: 'Unahin munang gawin nang maayos ang paraan na itinuro', id: 'Memprioritaskan menyelesaikan dengan baik sesuai metode yang ditentukan', ne: 'निर्देशित तरिकामा पहिले भरपर्दो ढंगले काम गर्नलाई प्राथमिकता दिन्छु', th: 'ให้ความสำคัญกับการทำตามวิธีที่ได้รับมอบหมายให้ดีก่อน' } },
    ],
  },
  {
    id: 11, axis: 'proactivity',
    text: {
      ja: '空き時間が生まれたとき、あなたはどうしますか？',
      vi: 'Khi có thời gian rảnh trong giờ làm, bạn thường làm gì?',
      zh: '有空闲时间时，您通常会怎么做？',
      tl: 'Kapag may libreng oras sa trabaho, ano ang karaniwang ginagawa mo?',
      id: 'Saat ada waktu luang di tempat kerja, apa yang biasanya Anda lakukan?',
      ne: 'काम गर्दा खाली समय भएमा के गर्नुहुन्छ?',
      th: 'เมื่อมีเวลาว่างในที่ทำงาน คุณมักทำอะไร?',
    },
    choices: [
      { label: { ja: '周りを見て、手伝えることや次の準備を探す', vi: 'Nhìn xung quanh, tìm việc giúp đỡ hoặc chuẩn bị tiếp theo', zh: '看看周围，寻找可以帮忙的事或为下一步做准备', tl: 'Tumingin sa paligid, maghanap ng maitutulong o ihanda ang susunod', id: 'Melihat sekitar, mencari yang bisa dibantu atau persiapan selanjutnya', ne: 'वरिपरि हेरेर मद्दत गर्न सकिने वा अर्को तयारी खोज्छु', th: 'มองรอบๆ หาสิ่งที่ช่วยได้หรือเตรียมงานถัดไป' } },
      { label: { ja: '自分のスキルアップにつながることをする', vi: 'Làm những gì giúp nâng cao kỹ năng bản thân', zh: '做有助于提升自己技能的事', tl: 'Gumawa ng bagay na makakatulong sa sariling skill improvement', id: 'Melakukan hal yang bisa meningkatkan kemampuan sendiri', ne: 'आफ्नो सीप विकासमा मद्दत पुग्ने काम गर्छु', th: 'ทำสิ่งที่ช่วยพัฒนาทักษะของตัวเอง' } },
      { label: { ja: '上司に何をすべきか確認する', vi: 'Hỏi cấp trên nên làm gì', zh: '向上级确认应该做什么', tl: 'Itanong sa boss kung ano ang dapat gawin', id: 'Bertanya ke atasan apa yang harus dilakukan', ne: 'माथिल्लो अधिकारीलाई के गर्ने भनेर सोध्छु', th: 'ถามหัวหน้าว่าควรทำอะไร' } },
      { label: { ja: 'しっかり休んで、次の業務に備える', vi: 'Nghỉ ngơi đầy đủ để chuẩn bị cho công việc tiếp theo', zh: '好好休息，为下一项工作做准备', tl: 'Magpahinga nang maayos para sa susunod na trabaho', id: 'Beristirahat dengan baik untuk persiapan pekerjaan berikutnya', ne: 'राम्ररी आराम गरी अर्को कामको तयारी गर्छु', th: 'พักผ่อนอย่างเต็มที่เพื่อเตรียมพร้อมสำหรับงานถัดไป' } },
    ],
  },
  {
    id: 12, axis: 'proactivity',
    text: {
      ja: '5年後の自分の仕事について、どのようなビジョンを持っていますか？',
      vi: 'Bạn có tầm nhìn gì về công việc của mình sau 5 năm?',
      zh: '您对5年后自己的工作有什么规划？',
      tl: 'Ano ang iyong pangitain para sa iyong trabaho pagkalipas ng 5 taon?',
      id: 'Apa visi Anda untuk pekerjaan Anda dalam 5 tahun ke depan?',
      ne: '५ वर्षपछिको आफ्नो कामबारे तपाईंको के दृष्टिकोण छ?',
      th: 'คุณมีวิสัยทัศน์อะไรเกี่ยวกับงานของคุณในอีก 5 ปีข้างหน้า?',
    },
    choices: [
      { label: { ja: 'チームをまとめる立場で会社に貢献したい', vi: 'Muốn đóng góp cho công ty ở vị trí dẫn dắt nhóm', zh: '想以团队领导的身份为公司做贡献', tl: 'Gustong mag-ambag sa kumpanya bilang team leader', id: 'Ingin berkontribusi ke perusahaan di posisi yang memimpin tim', ne: 'टोली नेतृत्व गर्ने ठाउँमा कम्पनीमा योगदान गर्न चाहन्छु', th: 'อยากมีส่วนร่วมกับบริษัทในฐานะผู้นำทีม' } },
      { label: { ja: '専門スキルを磨いてプロフェッショナルになりたい', vi: 'Muốn trau dồi kỹ năng chuyên môn để trở thành chuyên gia', zh: '想磨练专业技能成为专家', tl: 'Gustong paghusayin ang espesyalidad at maging propesyonal', id: 'Ingin mengasah keahlian dan menjadi profesional', ne: 'विशेष सीप सुधारेर पेशेवर बन्न चाहन्छु', th: 'อยากฝึกฝนทักษะเฉพาะทางเพื่อเป็นมืออาชีพ' } },
      { label: { ja: '安定した環境で着実にキャリアを積みたい', vi: 'Muốn phát triển sự nghiệp vững chắc trong môi trường ổn định', zh: '想在稳定的环境中踏实积累经验', tl: 'Gustong bumuo ng career nang matatag sa stable na kapaligiran', id: 'Ingin membangun karir secara mantap di lingkungan yang stabil', ne: 'स्थिर वातावरणमा बिस्तारै क्यारियर बनाउन चाहन्छु', th: 'อยากสร้างอาชีพอย่างมั่นคงในสภาพแวดล้อมที่เสถียร' } },
      { label: { ja: 'まずは目の前の仕事をしっかりやることが大事だと思う', vi: 'Nghĩ rằng trước hết phải làm tốt công việc trước mắt', zh: '觉得首先要做好眼前的工作', tl: 'Sa tingin ko mahalaga munang gawin nang maayos ang trabaho ngayon', id: 'Menurut saya yang penting adalah mengerjakan pekerjaan di depan mata dengan baik', ne: 'पहिले सामुन्नेको काम राम्ररी गर्नु महत्त्वपूर्ण ठान्छु', th: 'คิดว่าสิ่งสำคัญคือทำงานตรงหน้าให้ดีก่อน' } },
    ],
  },

  // ===== Q13〜Q15: ストレス耐性 (Stress Tolerance) =====
  {
    id: 13, axis: 'stressTolerance',
    text: {
      ja: '上司から厳しいフィードバックをもらったとき、どう感じますか？',
      vi: 'Khi nhận phản hồi gay gắt từ cấp trên, bạn cảm thấy thế nào?',
      zh: '收到上级严厉反馈时，您有什么感受？',
      tl: 'Paano mo nararamdaman kapag nakatanggap ng mahigpit na feedback mula sa superyor?',
      id: 'Bagaimana perasaan Anda ketika mendapat umpan balik keras dari atasan?',
      ne: 'माथिल्लो अधिकारीबाट कडा प्रतिक्रिया पाएमा कस्तो महसुस हुन्छ?',
      th: 'เมื่อได้รับ feedback ที่รุนแรงจากหัวหน้า คุณรู้สึกอย่างไร?',
    },
    choices: [
      { label: { ja: '具体的に何を改善すべきか考え、すぐ行動に移す', vi: 'Suy nghĩ cụ thể cần cải thiện gì và hành động ngay', zh: '具体思考应该改善什么，并立即行动', tl: 'Pag-isipan kung ano ang dapat i-improve at agad na kumilos', id: 'Memikirkan secara spesifik apa yang perlu diperbaiki dan segera bertindak', ne: 'विशेष रूपमा के सुधार्ने सोचेर तुरुन्तै कार्यमा लाग्छु', th: 'คิดอย่างเป็นรูปธรรมว่าควรปรับปรุงอะไรและลงมือทันที' } },
      { label: { ja: '一度受け止めてから、自分なりに改善点を見つける', vi: 'Tiếp nhận trước, rồi tự tìm điểm cần cải thiện', zh: '先接受，然后自己找出改善点', tl: 'Tanggapin muna, tapos hanapin ang sariling improvement points', id: 'Menerima dulu, lalu menemukan sendiri hal yang perlu diperbaiki', ne: 'पहिले स्वीकार गरी, आफ्नै तरिकाले सुधारका बिन्दुहरू खोज्छु', th: 'รับฟังก่อน แล้วค่อยหาจุดที่ต้องปรับปรุงด้วยตัวเอง' } },
      { label: { ja: '少し落ち込むが、時間が経てば前向きになれる', vi: 'Hơi buồn nhưng sau một thời gian sẽ tích cực lại', zh: '会有点沮丧，但过段时间就能变积极', tl: 'Medyo malulungkot pero magiging positibo pagkaraan ng ilang panahon', id: 'Sedikit kecewa, tapi bisa positif setelah beberapa waktu', ne: 'अलि निराश हुन्छ, तर समय बित्दा सकारात्मक हुन्छु', th: 'เสียใจนิดหน่อย แต่พอเวลาผ่านไปก็กลับมาเป็นบวกได้' } },
      { label: { ja: 'フィードバックの内容が適切かどうか、まず考える', vi: 'Trước hết suy nghĩ xem nội dung phản hồi có phù hợp không', zh: '先考虑反馈内容是否恰当', tl: 'Pag-isipan muna kung tama ba ang feedback', id: 'Mempertimbangkan terlebih dahulu apakah isi umpan balik tepat', ne: 'पहिले प्रतिक्रियाको विषय उचित छ कि छैन सोच्छु', th: 'คิดก่อนว่าเนื้อหา feedback เหมาะสมหรือไม่' } },
    ],
  },
  {
    id: 14, axis: 'stressTolerance',
    text: {
      ja: '慣れない環境で孤独や不安を感じたとき、どのように対処しますか？',
      vi: 'Khi cảm thấy cô đơn hay lo lắng trong môi trường mới, bạn đối phó thế nào?',
      zh: '在陌生环境中感到孤独或不安时，您如何应对？',
      tl: 'Kapag nakakaramdam ka ng kalungkutan o pagkabalisa sa bagong kapaligiran, paano ka nakakayanan?',
      id: 'Saat merasa kesepian atau cemas di lingkungan baru, bagaimana Anda mengatasinya?',
      ne: 'नयाँ वातावरणमा एक्लोपन वा चिन्ता महसुस गर्दा, कसरी सामना गर्नुहुन्छ?',
      th: 'เมื่อรู้สึกเหงาหรือวิตกกังวลในสภาพแวดล้อมใหม่ คุณรับมืออย่างไร?',
    },
    choices: [
      { label: { ja: '気持ちを整理して、信頼できる人に相談する', vi: 'Sắp xếp cảm xúc và tham khảo ý kiến người đáng tin cậy', zh: '整理好心情，找信任的人倾诉', tl: 'Ayusin ang nararamdaman at kumonsulta sa taong mapagkakatiwalaan', id: 'Merapikan perasaan dan berkonsultasi dengan orang yang dipercaya', ne: 'भावना मिलाएर विश्वासयोग्य व्यक्तिसँग सल्लाह गर्छु', th: 'จัดการอารมณ์แล้วปรึกษาคนที่ไว้ใจ' } },
      { label: { ja: '趣味や運動など、自分なりの方法でリフレッシュする', vi: 'Làm mới bản thân bằng sở thích, thể dục, v.v.', zh: '通过爱好或运动等方式来放松自己', tl: 'Mag-refresh sa sariling paraan tulad ng hobby o exercise', id: 'Menyegarkan diri dengan cara sendiri seperti hobi atau olahraga', ne: 'शौक वा व्यायाम जस्ता आफ्ना तरिकाले ताजा हुन्छु', th: 'ผ่อนคลายด้วยวิธีของตัวเอง เช่น งานอดิเรกหรือออกกำลังกาย' } },
      { label: { ja: '時間が経てば慣れると思い、じっと耐える', vi: 'Nghĩ rằng sẽ quen khi thời gian trôi qua và chịu đựng', zh: '觉得时间久了就会习惯，默默忍耐', tl: 'Tiisin na lang dahil masasanay din sa paglipas ng oras', id: 'Bertahan karena berpikir akan terbiasa seiring waktu', ne: 'समय बित्दा बस्ने ठान्दै सहन गर्छु', th: 'อดทนไป คิดว่าเวลาผ่านไปจะชินเอง' } },
      { label: { ja: '慣れた環境にできるだけ早く戻りたいと思う', vi: 'Muốn quay lại môi trường quen thuộc càng sớm càng tốt', zh: '想尽快回到熟悉的环境', tl: 'Gustong bumalik sa dating kapaligiran sa lalong madaling panahon', id: 'Ingin kembali ke lingkungan yang familiar secepat mungkin', ne: 'सकेसम्म चाँडो चिनेको वातावरणमा फर्कन चाहन्छु', th: 'อยากกลับไปสภาพแวดล้อมที่คุ้นเคยโดยเร็วที่สุด' } },
    ],
  },
  {
    id: 15, axis: 'stressTolerance',
    text: {
      ja: '忙しい日が何日も続いたとき、あなたはどうしますか？',
      vi: 'Khi những ngày bận rộn kéo dài liên tục, bạn làm gì?',
      zh: '当忙碌的日子持续了很多天，您会怎么做？',
      tl: 'Kapag maraming araw na sunod-sunod ang abalang araw, ano ang gagawin mo?',
      id: 'Saat hari-hari sibuk berlangsung terus-menerus, apa yang Anda lakukan?',
      ne: 'धेरै दिनसम्म व्यस्त दिनहरू लगातार जारी रहँदा, तपाईं के गर्नुहुन्छ?',
      th: 'เมื่อวันที่ยุ่งต่อเนื่องกันหลายวัน คุณจะทำอย่างไร?',
    },
    choices: [
      { label: { ja: '優先順位をつけて、一つずつ着実に片付ける', vi: 'Đặt thứ tự ưu tiên và xử lý từng việc một cách chắc chắn', zh: '按优先级排序，一件件踏实地完成', tl: 'Mag-prioritize at tapusin nang paisa-isa at matatag', id: 'Memprioritaskan dan menyelesaikan satu per satu secara mantap', ne: 'प्राथमिकता तोकेर एक-एक गरी पक्का रूपमा सकाउँछु', th: 'จัดลำดับความสำคัญแล้วจัดการทีละอย่างอย่างมั่นคง' } },
      { label: { ja: '周りと協力して、お互いの負担を軽くする', vi: 'Hợp tác với mọi người xung quanh để giảm bớt gánh nặng cho nhau', zh: '与周围的人合作，减轻彼此的负担', tl: 'Makipagtulungan sa mga kasamahan para pagaanin ang load ng bawat isa', id: 'Bekerja sama dengan rekan untuk meringankan beban masing-masing', ne: 'वरिपरिसँग सहकार्य गरी एक-अर्काको बोझ हलुका बनाउँछु', th: 'ร่วมมือกับคนรอบข้างเพื่อแบ่งเบาภาระซึ่งกันและกัน' } },
      { label: { ja: '体調に気をつけながら、できる限り頑張り続ける', vi: 'Cố gắng hết sức trong khi chú ý sức khỏe', zh: '注意身体状况，尽力坚持', tl: 'Patuloy na magsumikap habang nag-iingat sa kalusugan', id: 'Terus berusaha sambil menjaga kesehatan', ne: 'स्वास्थ्यमा ध्यान दिँदै, सकेसम्म मेहनत गरिरहन्छु', th: 'พยายามต่อไปเท่าที่ได้ โดยระวังสุขภาพ' } },
      { label: { ja: 'プレッシャーで集中力が落ちてしまうことがある', vi: 'Đôi khi áp lực làm giảm khả năng tập trung', zh: '有时压力会导致注意力下降', tl: 'Minsan bumababa ang focus dahil sa pressure', id: 'Kadang tekanan membuat konsentrasi menurun', ne: 'दबाबले कहिलेकाहीं एकाग्रता घट्छ', th: 'บางครั้งความกดดันทำให้สมาธิลดลง' } },
    ],
  },
];
