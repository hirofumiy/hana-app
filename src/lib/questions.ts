// Hana 採用前特性テスト - 全20問 7言語データ

export type Language = 'ja' | 'vi' | 'zh' | 'tl' | 'id' | 'ne' | 'th';

export interface Choice {
  label: Record<Language, string>;
}

export interface Question {
  id: number;
  axis: 'agreeableness' | 'conscientiousness' | 'adaptability' | 'proactivity';
  reverseScore: boolean;
  referenceOnly: boolean; // スコア計算外
  text: Record<Language, string>;
  choices: [Choice, Choice, Choice, Choice]; // A, B, C, D
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

export const AXIS_LABELS: Record<Question['axis'], Record<Language, string>> = {
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
};

export const questions: Question[] = [
  // ===== Q1〜Q5: 協調性 (Agreeableness) =====
  {
    id: 1, axis: 'agreeableness', reverseScore: false, referenceOnly: false,
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
      { label: { ja: '積極的に手伝う', vi: 'Chủ động giúp đỡ', zh: '主动帮助', tl: 'Aktibong tinutulungan', id: 'Aktif membantu', ne: 'सक्रिय रूपमा मद्दत गर्छु', th: 'ช่วยเหลืออย่างแข็งขัน' } },
      { label: { ja: '求められたら手伝う', vi: 'Giúp khi được yêu cầu', zh: '被请求时帮助', tl: 'Tumutulong kapag hiningi', id: 'Membantu jika diminta', ne: 'मागेमा मद्दत गर्छु', th: 'ช่วยเมื่อถูกขอ' } },
      { label: { ja: '見守る', vi: 'Quan sát và chờ', zh: '在旁观察', tl: 'Pinagmamasdan lang', id: 'Mengamati saja', ne: 'हेरिरहन्छु', th: 'แค่ดูอยู่' } },
      { label: { ja: '関わらない', vi: 'Không liên quan đến tôi', zh: '不想参与', tl: 'Hindi ko pakialam', id: 'Tidak peduli', ne: 'मलाई सरोकार छैन', th: 'ไม่เกี่ยวกับฉัน' } },
    ],
  },
  {
    id: 2, axis: 'agreeableness', reverseScore: false, referenceOnly: false,
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
      { label: { ja: '意見を伝えた上で従う', vi: 'Nói ý kiến rồi làm theo', zh: '表达意见后服从', tl: 'Sinasabi ang opinyon, tapos susunod', id: 'Menyampaikan pendapat lalu mengikuti', ne: 'मत राखेर पनि पालना गर्छु', th: 'บอกความเห็นแล้วปฏิบัติตาม' } },
      { label: { ja: '黙って従う', vi: 'Im lặng làm theo', zh: '默默服从', tl: 'Tahimik na susunod', id: 'Diam dan mengikuti', ne: 'चुपचाप पालना गर्छु', th: 'เงียบและปฏิบัติตาม' } },
      { label: { ja: '強く主張する', vi: 'Phản đối mạnh mẽ', zh: '强烈坚持己见', tl: 'Matibay na magtatalo', id: 'Bersikeras dengan pendapat sendiri', ne: 'कडाइसाथ आफ्नो मत अडान गर्छु', th: 'ยืนกรานอย่างแข็งกร้าว' } },
      { label: { ja: '別行動を取る', vi: 'Hành động theo ý mình', zh: '按自己的方式行动', tl: 'Gagawa ng sariling paraan', id: 'Bertindak sesuai keinginan sendiri', ne: 'आफ्नै तरिकामा काम गर्छु', th: 'ทำตามวิธีของตัวเอง' } },
    ],
  },
  {
    id: 3, axis: 'agreeableness', reverseScore: false, referenceOnly: false,
    text: {
      ja: '職場でトラブルが起きたとき、最初にどう対応しますか？',
      vi: 'Khi xảy ra sự cố tại nơi làm việc, bạn xử lý thế nào trước tiên?',
      zh: '工作中发生问题时，您首先会怎么处理？',
      tl: 'Kapag may problema sa trabaho, ano ang unang gagawin mo?',
      id: 'Saat terjadi masalah di tempat kerja, apa yang pertama Anda lakukan?',
      ne: 'कार्यस्थलमा समस्या आएमा, पहिले के गर्नुहुन्छ?',
      th: 'เมื่อเกิดปัญหาที่ทำงาน สิ่งแรกที่คุณทำคืออะไร?',
    },
    choices: [
      { label: { ja: '上司に報告する', vi: 'Báo cáo cấp trên ngay', zh: '立即向上级报告', tl: 'Mag-uulat agad sa superyor', id: 'Melaporkan ke atasan segera', ne: 'माथिल्लो अधिकारीलाई रिपोर्ट गर्छु', th: 'รายงานหัวหน้าทันที' } },
      { label: { ja: '同僚と相談する', vi: 'Hỏi ý kiến đồng nghiệp', zh: '与同事商量', tl: 'Kakausapin ang mga katrabaho', id: 'Berdiskusi dengan rekan kerja', ne: 'सहकर्मीसँग सल्लाह गर्छु', th: 'ปรึกษาเพื่อนร่วมงาน' } },
      { label: { ja: '自分で解決する', vi: 'Tự giải quyết', zh: '自己解决', tl: 'Ayusin mismo', id: 'Menyelesaikan sendiri', ne: 'आफैं समाधान गर्छु', th: 'แก้ไขเอง' } },
      { label: { ja: '様子を見る', vi: 'Chờ xem tình hình', zh: '观察情况', tl: 'Hihintayin ang mangyayari', id: 'Menunggu perkembangan', ne: 'कुरा हेर्छु', th: 'รอดูสถานการณ์' } },
    ],
  },
  {
    id: 4, axis: 'agreeableness', reverseScore: false, referenceOnly: false,
    text: {
      ja: '言葉が通じない同僚と一緒に働くことをどう思いますか？',
      vi: 'Bạn nghĩ thế nào về việc làm việc cùng người không hiểu ngôn ngữ của nhau?',
      zh: '与语言不通的同事一起工作，您怎么看？',
      tl: 'Paano mo mararamdaman ang pagtrabaho kasama ng hindi mo maintindihan ang wika?',
      id: 'Apa pendapat Anda tentang bekerja bersama rekan yang tidak bisa berkomunikasi dalam bahasa yang sama?',
      ne: 'भाषा नबुझिने सहकर्मीसँग काम गर्ने बारे तपाईंको के विचार छ?',
      th: 'คุณคิดอย่างไรกับการทำงานร่วมกับเพื่อนที่ไม่เข้าใจภาษาเดียวกัน?',
    },
    choices: [
      { label: { ja: '問題ない・助け合える', vi: 'Không vấn đề, hỗ trợ nhau được', zh: '没问题，可以互相帮助', tl: 'Walang problema, makakatulong tayo', id: 'Tidak masalah, bisa saling membantu', ne: 'समस्या छैन, एकअर्कालाई मद्दत गर्न सकिन्छ', th: 'ไม่มีปัญหา ช่วยเหลือกันได้' } },
      { label: { ja: '少し難しいが大丈夫', vi: 'Hơi khó nhưng ổn', zh: '有点难但没关系', tl: 'Medyo mahirap pero okay', id: 'Agak sulit tapi tidak apa-apa', ne: 'अलि गाह्रो छ तर ठिकै छ', th: 'ยากนิดหน่อย แต่ไม่เป็นไร' } },
      { label: { ja: 'なるべく避けたい', vi: 'Muốn tránh nếu có thể', zh: '尽量避免', tl: 'Gusto kong iwasan', id: 'Ingin menghindari jika bisa', ne: 'सम्भव भए टाढा रहन चाहन्छु', th: 'อยากหลีกเลี่ยงถ้าทำได้' } },
      { label: { ja: 'とても嫌だ', vi: 'Rất không thích', zh: '非常不喜欢', tl: 'Hindi ko gusto', id: 'Sangat tidak suka', ne: 'मलाई एकदमै मन पर्दैन', th: 'ไม่ชอบเลย' } },
    ],
  },
  {
    id: 5, axis: 'agreeableness', reverseScore: false, referenceOnly: false,
    text: {
      ja: '職場での人間関係について、最も大切にしていることは？',
      vi: 'Điều bạn coi trọng nhất trong các mối quan hệ tại nơi làm việc là gì?',
      zh: '在职场人际关系中，您最重视什么？',
      tl: 'Ano ang pinaka-importante sa iyo sa relasyon sa trabaho?',
      id: 'Apa yang paling Anda pentingkan dalam hubungan kerja?',
      ne: 'कार्यस्थलको सम्बन्धमा तपाईंले सबभन्दा महत्त्व दिने कुरा के हो?',
      th: 'สิ่งที่คุณให้ความสำคัญมากที่สุดในความสัมพันธ์ในที่ทำงานคืออะไร?',
    },
    choices: [
      { label: { ja: '信頼と助け合い', vi: 'Tin tưởng và hỗ trợ lẫn nhau', zh: '相互信任与帮助', tl: 'Tiwala at pagtutulungan', id: 'Kepercayaan dan saling membantu', ne: 'विश्वास र आपसी सहयोग', th: 'ความไว้วางใจและช่วยเหลือกัน' } },
      { label: { ja: '礼儀と距離感', vi: 'Lịch sự và giữ khoảng cách', zh: '礼貌与适当距离', tl: 'Kagalangan at tamang distansya', id: 'Kesopanan dan jarak yang tepat', ne: 'शिष्टाचार र उचित दूरी', th: 'มารยาทและระยะห่างที่เหมาะสม' } },
      { label: { ja: '仕事の成果', vi: 'Kết quả công việc', zh: '工作成果', tl: 'Resulta ng trabaho', id: 'Hasil kerja', ne: 'कामको नतिजा', th: 'ผลการทำงาน' } },
      { label: { ja: 'お互い干渉しない', vi: 'Không can thiệp nhau', zh: '互不干涉', tl: 'Huwag makialam sa isa\'t isa', id: 'Tidak saling mencampuri urusan', ne: 'एकअर्काको काममा हस्तक्षेप नगर्नु', th: 'ไม่ยุ่งเกี่ยวกัน' } },
    ],
  },
  // ===== Q6〜Q10: 誠実性 (Conscientiousness) =====
  {
    id: 6, axis: 'conscientiousness', reverseScore: false, referenceOnly: false,
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
      { label: { ja: 'すぐ連絡して謝る', vi: 'Liên lạc ngay và xin lỗi', zh: '立即联系并道歉', tl: 'Makikipag-ugnayan agad at magsosorry', id: 'Segera menghubungi dan meminta maaf', ne: 'तुरुन्त सम्पर्क गरी माफी माग्छु', th: 'ติดต่อทันทีและขอโทษ' } },
      { label: { ja: '到着してから謝る', vi: 'Đến nơi rồi xin lỗi', zh: '到达后再道歉', tl: 'Magsosorry pagdating', id: 'Meminta maaf setelah tiba', ne: 'पुगेपछि माफी माग्छु', th: 'ขอโทษเมื่อถึง' } },
      { label: { ja: '少しなら黙っている', vi: 'Im lặng nếu chỉ trễ một chút', zh: '只是稍微晚就不说', tl: 'Kung konting huli lang, hindi sasabihin', id: 'Diam saja jika hanya sedikit terlambat', ne: 'थोरै ढिला भए चुप रहन्छु', th: 'ถ้าสายนิดเดียวก็เงียบ' } },
      { label: { ja: '遅れても仕方ない', vi: 'Trễ cũng không sao', zh: '迟到也无所谓', tl: 'Okay lang mahuli', id: 'Terlambat juga tidak apa-apa', ne: 'ढिला भए पनि हुन्छ', th: 'สายก็ไม่เป็นไร' } },
    ],
  },
  {
    id: 7, axis: 'conscientiousness', reverseScore: true, referenceOnly: false,
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
      { label: { ja: '見られていなくても守る', vi: 'Tuân thủ dù không ai nhìn', zh: '没人看也遵守', tl: 'Sinusunod kahit walang nakakakita', id: 'Tetap mematuhi meski tidak dilihat', ne: 'कसैले नहेरे पनि पालना गर्छु', th: 'ปฏิบัติตามแม้ไม่มีใครดู' } },
      { label: { ja: '大体は守る', vi: 'Cơ bản là tuân thủ', zh: '基本上遵守', tl: 'Karamihan ay sinusunod', id: 'Pada dasarnya mematuhi', ne: 'सामान्यतः पालना गर्छु', th: 'โดยทั่วไปปฏิบัติตาม' } },
      { label: { ja: '状況次第で変える', vi: 'Tùy tình huống', zh: '视情况而定', tl: 'Depende sa sitwasyon', id: 'Tergantung situasi', ne: 'परिस्थिति हेरेर निर्णय गर्छु', th: 'แล้วแต่สถานการณ์' } },
      { label: { ja: '守らなくていいと思う', vi: 'Không cần tuân thủ', zh: '不需要遵守', tl: 'Hindi kailangan sumunod', id: 'Merasa tidak perlu mematuhi', ne: 'पालना गर्न जरुरी छैन', th: 'ไม่คิดว่าต้องปฏิบัติตาม' } },
    ],
  },
  {
    id: 8, axis: 'conscientiousness', reverseScore: true, referenceOnly: false,
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
      { label: { ja: 'すぐ上司に報告する', vi: 'Báo cáo cấp trên ngay lập tức', zh: '立即向上级报告', tl: 'Mag-uulat agad sa superyor', id: 'Segera melaporkan ke atasan', ne: 'तुरुन्त माथिल्लो अधिकारीलाई रिपोर्ट गर्छु', th: 'รายงานหัวหน้าทันที' } },
      { label: { ja: '自分で直してから報告', vi: 'Tự sửa rồi mới báo cáo', zh: '自己改正后再报告', tl: 'Aayusin muna bago mag-ulat', id: 'Memperbaiki dulu baru melapor', ne: 'आफैं ठिक गरेर रिपोर्ट गर्छु', th: 'แก้ไขเองก่อนแล้วจึงรายงาน' } },
      { label: { ja: 'なるべく隠したい', vi: 'Muốn giấu nếu có thể', zh: '尽量隐瞒', tl: 'Gusto itago kung posible', id: 'Ingin menyembunyikan jika bisa', ne: 'सम्भव भए लुकाउन चाहन्छु', th: 'อยากซ่อนถ้าทำได้' } },
      { label: { ja: 'ばれなければいい', vi: 'Không sao nếu không bị phát hiện', zh: '不被发现就行了', tl: 'Okay na kung hindi mahuhuli', id: 'Tidak apa-apa asal tidak ketahuan', ne: 'थाहा नपाए हुन्छ', th: 'ไม่เป็นไรถ้าไม่มีใครรู้' } },
    ],
  },
  {
    id: 9, axis: 'conscientiousness', reverseScore: true, referenceOnly: false,
    text: {
      ja: '仕事を途中で終わらせなければならない状況になったら？',
      vi: 'Nếu phải bỏ dở công việc giữa chừng, bạn sẽ làm gì?',
      zh: '如果不得不中途放弃工作，您会怎么做？',
      tl: 'Kung kailangan mong iwan ang trabaho sa kalagitnaan, ano ang gagawin mo?',
      id: 'Jika Anda harus meninggalkan pekerjaan di tengah jalan, apa yang akan Anda lakukan?',
      ne: 'काम बीचमा छोड्नुपर्ने अवस्था आएमा के गर्नुहुन्छ?',
      th: 'ถ้าคุณต้องทิ้งงานกลางคัน คุณจะทำอย่างไร?',
    },
    choices: [
      { label: { ja: '引き継ぎを丁寧に行う', vi: 'Bàn giao cẩn thận', zh: '认真做好交接', tl: 'Maingat na magha-handover', id: 'Melakukan serah terima dengan teliti', ne: 'ध्यानपूर्वक हस्तान्तरण गर्छु', th: 'ส่งมอบงานอย่างรอบคอบ' } },
      { label: { ja: 'できる限り終わらせる', vi: 'Cố gắng hoàn thành nhiều nhất có thể', zh: '尽量完成更多', tl: 'Tatapusin ang lahat hangga\'t maaari', id: 'Berusaha menyelesaikan sebanyak mungkin', ne: 'सकेसम्म सकाउने प्रयास गर्छु', th: 'พยายามทำให้เสร็จมากที่สุด' } },
      { label: { ja: '仕方がないと諦める', vi: 'Chấp nhận và bỏ qua', zh: '没办法就算了', tl: 'Wala nang magagawa, hayaan na', id: 'Tidak ada cara lain, pasrah saja', ne: 'लाचार भएर छोड्छु', th: 'จำเป็นก็ปล่อยไป' } },
      { label: { ja: 'すぐ帰る', vi: 'Về ngay', zh: '直接离开', tl: 'Aalis na agad', id: 'Langsung pulang', ne: 'तुरुन्त जान्छु', th: 'กลับบ้านทันที' } },
    ],
  },
  {
    id: 10, axis: 'conscientiousness', reverseScore: false, referenceOnly: true,
    text: {
      ja: '前の職場を辞めた一番の理由は何ですか？',
      vi: 'Lý do chính bạn rời công ty trước là gì?',
      zh: '您离开上一份工作的主要原因是什么？',
      tl: 'Ano ang pangunahing dahilan ng iyong pag-alis sa dating trabaho?',
      id: 'Apa alasan utama Anda meninggalkan pekerjaan sebelumnya?',
      ne: 'अघिल्लो जागिर छोड्नुको मुख्य कारण के थियो?',
      th: 'เหตุผลหลักที่คุณลาออกจากงานก่อนหน้าคืออะไร?',
    },
    choices: [
      { label: { ja: 'より良い機会を求めて', vi: 'Tìm kiếm cơ hội tốt hơn', zh: '寻求更好的机会', tl: 'Naghahanap ng mas magandang pagkakataon', id: 'Mencari kesempatan yang lebih baik', ne: 'राम्रो अवसर खोजेर', th: 'หาโอกาสที่ดีกว่า' } },
      { label: { ja: '家族・生活の事情', vi: 'Hoàn cảnh gia đình', zh: '家庭、生活原因', tl: 'Dahil sa pamilya o pamumuhay', id: 'Alasan keluarga atau kehidupan', ne: 'परिवार वा जीवन परिस्थिति', th: 'เหตุผลครอบครัวหรือชีวิต' } },
      { label: { ja: '職場の人間関係', vi: 'Mối quan hệ tại nơi làm việc', zh: '职场人际关系', tl: 'Relasyon sa trabaho', id: 'Hubungan di tempat kerja', ne: 'कार्यस्थलको मानवीय सम्बन्ध', th: 'ความสัมพันธ์ในที่ทำงาน' } },
      { label: { ja: '給与・待遇への不満', vi: 'Không hài lòng về lương', zh: '对薪资待遇不满', tl: 'Hindi masaya sa sahod', id: 'Tidak puas dengan gaji', ne: 'तलब र सुविधाप्रति असन्तुष्टि', th: 'ไม่พอใจเงินเดือน' } },
    ],
  },
  // ===== Q11〜Q15: 適応力 (Adaptability) =====
  {
    id: 11, axis: 'adaptability', reverseScore: true, referenceOnly: false,
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
      { label: { ja: '理解して取り入れたい', vi: 'Muốn hiểu và áp dụng', zh: '理解并愿意融入', tl: 'Gustong maunawaan at sundin', id: 'Ingin memahami dan menerapkannya', ne: 'बुझेर अपनाउन चाहन्छु', th: 'อยากเข้าใจและนำไปใช้' } },
      { label: { ja: '難しいが学びたい', vi: 'Khó nhưng muốn học', zh: '虽难但愿意学', tl: 'Mahirap ngunit gustong matuto', id: 'Sulit tapi ingin belajar', ne: 'गाह्रो छ तर सिक्न चाहन्छु', th: 'ยากแต่อยากเรียนรู้' } },
      { label: { ja: '少し抵抗感がある', vi: 'Cảm thấy khó chịu', zh: '有些抵触', tl: 'Medyo hindi komportable', id: 'Merasa kurang nyaman', ne: 'अलि असहज महसुस हुन्छ', th: 'รู้สึกไม่สบายใจ' } },
      { label: { ja: '必要と思わない', vi: 'Không thấy cần thiết', zh: '不觉得有必要', tl: 'Hindi ko kailangan', id: 'Tidak merasa perlu', ne: 'आवश्यक लाग्दैन', th: 'ไม่คิดว่าจำเป็น' } },
    ],
  },
  {
    id: 12, axis: 'adaptability', reverseScore: false, referenceOnly: false,
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
      { label: { ja: 'すぐに切り替えられる', vi: 'Chuyển đổi ngay lập tức', zh: '马上切换', tl: 'Agad na mag-aayos', id: 'Langsung beralih', ne: 'तुरुन्त अनुकूलन गर्छु', th: 'ปรับตัวได้ทันที' } },
      { label: { ja: '少し時間がかかる', vi: 'Cần một chút thời gian', zh: '需要一点时间', tl: 'Kailangan ng kaunting oras', id: 'Butuh sedikit waktu', ne: 'अलि समय लाग्छ', th: 'ต้องการเวลาสักหน่อย' } },
      { label: { ja: 'なぜ変わったか確認する', vi: 'Hỏi lý do thay đổi', zh: '确认变化原因', tl: 'Tatanungin kung bakit nagbago', id: 'Menanyakan alasan perubahan', ne: 'किन बदलियो भनेर सोध्छु', th: 'ถามเหตุผลที่เปลี่ยน' } },
      { label: { ja: '変化が苦手・嫌だ', vi: 'Không giỏi thích nghi', zh: '不擅长适应变化', tl: 'Hindi magaling mag-adapt', id: 'Tidak pandai beradaptasi', ne: 'परिवर्तनमा अप्ठेरो लाग्छ', th: 'ปรับตัวกับการเปลี่ยนแปลงได้ยาก' } },
    ],
  },
  {
    id: 13, axis: 'adaptability', reverseScore: true, referenceOnly: false,
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
      { label: { ja: '積極的に聞いて学ぶ', vi: 'Chủ động hỏi và học', zh: '积极提问并学习', tl: 'Aktibong magtatanong at matututo', id: 'Aktif bertanya dan belajar', ne: 'सक्रिय रूपमा सोधेर सिक्छु', th: 'ถามอย่างกระตือรือร้นและเรียนรู้' } },
      { label: { ja: 'まず自分で試みる', vi: 'Thử làm trước', zh: '先自己尝试', tl: 'Susubukan muna mismo', id: 'Mencoba sendiri dulu', ne: 'पहिले आफैं प्रयास गर्छु', th: 'ลองทำด้วยตัวเองก่อน' } },
      { label: { ja: 'できないと伝える', vi: 'Nói là không làm được', zh: '告知做不到', tl: 'Sasabihing hindi ko magagawa', id: 'Memberitahu bahwa tidak bisa', ne: 'गर्न सक्दिन भन्छु', th: 'บอกว่าทำไม่ได้' } },
      { label: { ja: '断る', vi: 'Từ chối', zh: '拒绝', tl: 'Tatanggihan', id: 'Menolak', ne: 'इन्कार गर्छु', th: 'ปฏิเสธ' } },
    ],
  },
  {
    id: 14, axis: 'adaptability', reverseScore: false, referenceOnly: false,
    text: {
      ja: '日本語が上達することについて、どう感じていますか？',
      vi: 'Bạn cảm thấy thế nào về việc học và cải thiện tiếng Nhật?',
      zh: '关于提高日语水平，您有什么想法？',
      tl: 'Paano mo nararamdaman ang pagpapabuti ng iyong Japanese?',
      id: 'Bagaimana perasaan Anda tentang meningkatkan kemampuan bahasa Jepang?',
      ne: 'जापानी भाषा सुधार्नेबारे तपाईंलाई कस्तो लाग्छ?',
      th: 'คุณรู้สึกอย่างไรกับการพัฒนาภาษาญี่ปุ่น?',
    },
    choices: [
      { label: { ja: 'ぜひ上達したい', vi: 'Rất muốn cải thiện', zh: '非常想提高', tl: 'Gustong mapabuti', id: 'Sangat ingin meningkatkan', ne: 'अवश्य सुधार गर्न चाहन्छु', th: 'อยากพัฒนามาก' } },
      { label: { ja: 'できれば学びたい', vi: 'Muốn học nếu có thể', zh: '如果可以愿意学', tl: 'Gustong matuto kung maaari', id: 'Ingin belajar jika memungkinkan', ne: 'सम्भव भए सिक्न चाहन्छु', th: 'อยากเรียนถ้าทำได้' } },
      { label: { ja: '仕事に必要な分だけ', vi: 'Chỉ cần đủ dùng cho công việc', zh: '只需工作所需程度', tl: 'Para lang sa trabaho', id: 'Hanya sebatas kebutuhan kerja', ne: 'काममा चाहिनेजति मात्र', th: 'แค่ที่ต้องการสำหรับงาน' } },
      { label: { ja: '特に必要と思わない', vi: 'Không thấy cần thiết', zh: '觉得没有必要', tl: 'Hindi ko kailangan', id: 'Tidak merasa perlu', ne: 'आवश्यक लाग्दैन', th: 'ไม่คิดว่าจำเป็น' } },
    ],
  },
  {
    id: 15, axis: 'adaptability', reverseScore: false, referenceOnly: true,
    text: {
      ja: 'これまでで最も苦労した経験を、どう乗り越えましたか？',
      vi: 'Bạn đã vượt qua khó khăn lớn nhất trong cuộc sống như thế nào?',
      zh: '您是如何度过人生中最艰难的经历的？',
      tl: 'Paano mo nalampasan ang pinakamahirap na karanasan mo sa buhay?',
      id: 'Bagaimana Anda melewati pengalaman tersulit dalam hidup Anda?',
      ne: 'अहिलेसम्मको सबभन्दा कठिन अनुभव कसरी पार गर्नुभयो?',
      th: 'คุณผ่านประสบการณ์ที่ยากที่สุดในชีวิตมาได้อย่างไร?',
    },
    choices: [
      { label: { ja: '人の助けを借りた', vi: 'Nhờ sự giúp đỡ của người khác', zh: '借助他人的帮助', tl: 'Sa tulong ng iba', id: 'Dengan bantuan orang lain', ne: 'अरूको सहायता लिएर', th: 'ขอความช่วยเหลือจากผู้อื่น' } },
      { label: { ja: '一人で粘り強く取り組んだ', vi: 'Một mình kiên trì cố gắng', zh: '一个人坚持努力', tl: 'Nag-iisang tiyaga', id: 'Berjuang sendiri dengan tekun', ne: 'एक्लै लगनशीलतापूर्वक', th: 'พยายามคนเดียวอย่างมุ่งมั่น' } },
      { label: { ja: '時間が解決してくれた', vi: 'Thời gian giải quyết', zh: '时间解决了', tl: 'Naayos ng oras', id: 'Waktu yang menyelesaikan', ne: 'समयले समाधान गर्यो', th: 'เวลาแก้ปัญหาให้' } },
      { label: { ja: '諦めた・まだ解決していない', vi: 'Bỏ cuộc', zh: '放弃了', tl: 'Sumuko', id: 'Menyerah', ne: 'हार मानें', th: 'ยอมแพ้' } },
    ],
  },
  // ===== Q16〜Q20: 積極性 (Proactivity) =====
  {
    id: 16, axis: 'proactivity', reverseScore: false, referenceOnly: false,
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
      { label: { ja: '上司に提案する', vi: 'Đề xuất với cấp trên', zh: '向上级提出建议', tl: 'Imumungkahi sa superyor', id: 'Mengusulkan ke atasan', ne: 'माथिल्लो अधिकारीलाई सुझाव दिन्छु', th: 'เสนอแนะหัวหน้า' } },
      { label: { ja: '同僚に話す', vi: 'Nói với đồng nghiệp', zh: '告诉同事', tl: 'Sasabihin sa katrabaho', id: 'Menceritakan ke rekan kerja', ne: 'सहकर्मीलाई बताउँछु', th: 'บอกเพื่อนร่วมงาน' } },
      { label: { ja: '自分だけ実践する', vi: 'Tự áp dụng cho mình', zh: '只自己实践', tl: 'Gagawin para sa sarili ko lang', id: 'Menerapkan untuk diri sendiri saja', ne: 'आफैं मात्र अपनाउँछु', th: 'ทำเองแค่สำหรับตัวเอง' } },
      { label: { ja: '何もしない', vi: 'Không làm gì', zh: '什么都不做', tl: 'Walang gagawin', id: 'Tidak melakukan apa-apa', ne: 'केही गर्दिन', th: 'ไม่ทำอะไร' } },
    ],
  },
  {
    id: 17, axis: 'proactivity', reverseScore: false, referenceOnly: false,
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
      { label: { ja: '自分から仕事を探す', vi: 'Tự tìm việc để làm', zh: '主动找工作做', tl: 'Maghahanap ng trabahong gagawin', id: 'Mencari pekerjaan yang bisa dilakukan', ne: 'आफैं काम खोज्छु', th: 'หางานทำด้วยตัวเอง' } },
      { label: { ja: '指示を待つ', vi: 'Chờ hướng dẫn', zh: '等待指示', tl: 'Maghihintay ng instruksyon', id: 'Menunggu instruksi', ne: 'निर्देशन पर्खन्छु', th: 'รอคำสั่ง' } },
      { label: { ja: '同僚を手伝う', vi: 'Giúp đồng nghiệp', zh: '帮助同事', tl: 'Tutulong sa katrabaho', id: 'Membantu rekan kerja', ne: 'सहकर्मीलाई मद्दत गर्छु', th: 'ช่วยเหลือเพื่อนร่วมงาน' } },
      { label: { ja: '休む・スマホを見る', vi: 'Nghỉ ngơi', zh: '休息/看手机', tl: 'Magpapahinga', id: 'Istirahat', ne: 'आराम गर्छु', th: 'พักผ่อน / เล่นโทรศัพท์' } },
    ],
  },
  {
    id: 18, axis: 'proactivity', reverseScore: false, referenceOnly: false,
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
      { label: { ja: 'リーダーになりたい', vi: 'Muốn trở thành lãnh đạo', zh: '想成为领导', tl: 'Gusto maging lider', id: 'Ingin menjadi pemimpin', ne: 'नेता बन्न चाहन्छु', th: 'อยากเป็นผู้นำ' } },
      { label: { ja: '専門技術を深めたい', vi: 'Muốn nâng cao kỹ năng chuyên môn', zh: '想深化专业技能', tl: 'Gusto palalimin ang espesyalidad', id: 'Ingin memperdalam keahlian', ne: 'विशेष सीप गहन बनाउन चाहन्छु', th: 'อยากพัฒนาทักษะเฉพาะทาง' } },
      { label: { ja: '今の仕事を続けたい', vi: 'Tiếp tục công việc hiện tại', zh: '继续现在的工作', tl: 'Ituloy ang kasalukuyang trabaho', id: 'Melanjutkan pekerjaan saat ini', ne: 'हालको काम जारी राख्न चाहन्छु', th: 'อยากทำงานปัจจุบันต่อไป' } },
      { label: { ja: 'まだ考えていない', vi: 'Chưa nghĩ đến', zh: '还没想过', tl: 'Hindi pa naiisip', id: 'Belum memikirkannya', ne: 'अझै सोचेको छैन', th: 'ยังไม่ได้คิด' } },
    ],
  },
  {
    id: 19, axis: 'proactivity', reverseScore: true, referenceOnly: false,
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
      { label: { ja: '成長のチャンスと思う', vi: 'Xem đó là cơ hội phát triển', zh: '视为成长机会', tl: 'Tinitingnan bilang pagkakataon para lumago', id: 'Melihatnya sebagai kesempatan berkembang', ne: 'विकासको अवसर ठान्छु', th: 'มองเป็นโอกาสในการเติบโต' } },
      { label: { ja: '少し凹むが活かす', vi: 'Hơi nản nhưng cố gắng tận dụng', zh: '有点沮丧但会加以利用', tl: 'Medyo nalulungkot ngunit ginagamit', id: 'Sedikit kecewa tapi memanfaatkannya', ne: 'अलि निराश भए पनि प्रयोग गर्छु', th: 'เสียใจนิดหน่อยแต่นำไปใช้ประโยชน์' } },
      { label: { ja: 'やる気がなくなる', vi: 'Mất động lực', zh: '失去干劲', tl: 'Nawalan ng gana', id: 'Kehilangan motivasi', ne: 'उत्साह गुम्छ', th: 'หมดกำลังใจ' } },
      { label: { ja: '辞めたくなる', vi: 'Muốn nghỉ việc', zh: '想辞职', tl: 'Gustong mag-resign', id: 'Ingin berhenti kerja', ne: 'जागिर छोड्न मन लाग्छ', th: 'อยากลาออก' } },
    ],
  },
  {
    id: 20, axis: 'proactivity', reverseScore: false, referenceOnly: true,
    text: {
      ja: 'この会社・仕事に、あなたが一番期待していることは何ですか？',
      vi: 'Điều bạn kỳ vọng nhất ở công ty và công việc này là gì?',
      zh: '您对这份工作最大的期待是什么？',
      tl: 'Ano ang pinaka-inaasahan mo sa kumpanya at trabahong ito?',
      id: 'Apa yang paling Anda harapkan dari perusahaan dan pekerjaan ini?',
      ne: 'यस कम्पनी र कामबाट तपाईंले सबभन्दा बढी के अपेक्षा गर्नुहुन्छ?',
      th: 'สิ่งที่คุณคาดหวังมากที่สุดจากบริษัทและงานนี้คืออะไร?',
    },
    choices: [
      { label: { ja: 'スキルアップ・成長', vi: 'Nâng cao kỹ năng và phát triển', zh: '提升技能与成长', tl: 'Pag-unlad ng kasanayan at paglago', id: 'Peningkatan kemampuan dan pertumbuhan', ne: 'सीप वृद्धि र विकास', th: 'พัฒนาทักษะและเติบโต' } },
      { label: { ja: '安定した収入', vi: 'Thu nhập ổn định', zh: '稳定的收入', tl: 'Matatag na kita', id: 'Pendapatan yang stabil', ne: 'स्थिर आम्दानी', th: 'รายได้ที่มั่นคง' } },
      { label: { ja: '良い人間関係', vi: 'Môi trường làm việc tốt', zh: '良好的人际关系', tl: 'Magandang kapaligiran', id: 'Lingkungan kerja yang baik', ne: 'राम्रो कार्य वातावरण', th: 'สภาพแวดล้อมการทำงานที่ดี' } },
      { label: { ja: 'その他', vi: 'Khác', zh: '其他', tl: 'Iba pa', id: 'Lainnya', ne: 'अन्य', th: 'อื่น ๆ' } },
    ],
  },
];
