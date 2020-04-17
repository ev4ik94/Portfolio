var labels = {
  uz: [''],
  oz: [''],
  ru: ['Физические лица', 'Юридические лица', 'Прочее'],
  en:[]
}

var labelsLineDgrm = {
  uz: [''],
  oz: [''],
  ru: ['Выполнено', 'В обработке', 'Отклонено'],
  en:[]
}


export var RoundDiagramm = {
      chart: {
        height: 290,
        type: 'radialBar',
        animations: {
        	enabled: true,
        	easing: 'easeinout',
        	speed: 800,
        	delay: 300,
        	animateGradually: {
            	enabled: false,
            	delay: 150
        	},
        	dynamicAnimation: {
            	enabled: true,
            	speed: 800
        	}
    	}
      },
      plotOptions: {
        radialBar: {
        	offsetX: window.innerWidth<510?0:25,
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
               margin: 5,
               size: window.innerWidth<330?'40':'45%',
               background: 'transparent',
               image: undefined     
            },

            dataLabels: {
        		total: {
          			show: true,
          			label: 'Завершенные',
          			colors: '#fefe'		
        		}
      		}
       	}
     },
              
     stroke: {
       lineCap: 'round'
     },
    colors: ['#e31e24', '#9E9E9E', '#212640'],
    labels: labels['ru'],
    legend: {
        show: true,
        floating: true,
        fontSize: '13px',
        position: window.innerWidth<350?'bottom':'right',
        offsetX: 70,
        offsetY: 5,
        labels: {
           colors: '#fefefe',
           useSeriesColors: false

        },
        onItemHover: ()=>{
        	return {highlightDataSeries:false};
        },      
        formatter: (seriesName, opts)=> opts.w.globals.series[opts.seriesIndex] + "  " + seriesName,
              	
        itemMargin: {
           horizontal: window.innerWidth<1130?20:50,
        }
    },
              
   };



export var LineDiagramm = {

            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                  show: false
                },
                zoom: {
                  enabled: false
                }
              },
            responsive: [{
                breakpoint: 480,
                options: {
                  legend: {
                    position: 'top',
                    offsetX: 0,
                    offsetY: 0
                  }
                }
              }],
              colors: ['#212640', '#fefefe', '#e31e24'],
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '70%'
                },
              },
              xaxis: {
                type: 'text',
                categories: ['янв','фев','мар','апр','май','июн','июл'],
                
              },
              stroke: {
          		show: true,
          		width: 1
          
        	},
        	dataLabels: {
          enabled: false
        },
              legend: {
                position: 'top',
                offsetY: 0
              },
              fill: {
                opacity: 1
              }
};




export var dataCars = [
  {
    id: 1,
    name: 'Cobalt',
    engine:[
      {
        id: 1,
        name: 'LTZ turbo 2.0',
        cost: 299853000
      },
      {
        id: 2,
        name: 'LTZ 2.4',
        cost: 246732500
      }
    ],
    image: {
      large: `${window.location.origin}/image/picture/testPicture/Cars/Cobalt.png`,
    }

  },
  {
    id: 2,
    name: 'Damas',
    engine:[
      {
        id: 1,
        name: 'LTZ turbo 2.0',
        cost: 499853000
      },
      {
        id: 2,
        name: 'LTZ 2.4',
        cost: 346732500
      }
    ],
    image: {
      large: `${window.location.origin}/image/picture/testPicture/Cars/Damas.png`,
    }

  },
  {
    id: 3,
    name: 'Equonix',
    engine:[
      {
        id: 1,
        name: 'LTZ turbo 2.0',
        cost: 199853000
      },
      {
        id: 2,
        name: 'LTZ 2.4',
        cost: 146732500
      }
    ],
    image: {
      large: `${window.location.origin}/image/picture/testPicture/Cars/Equonix.png`,
    }

  },
  {
    id: 4,
    name: 'Gentra',
    engine:[
      {
        id: 1,
        name: 'LTZ turbo 2.0',
        cost: 229853000
      },
      {
        id: 2,
        name: 'LTZ 2.4',
        cost: 216732500
      }
    ],
    image: {
      large: `${window.location.origin}/image/picture/testPicture/Cars/Gentra.png`,
    }

  },
  {
    id: 5,
    name: 'Labo',
    engine:[
      {
        id: 1,
        name: 'LTZ turbo 2.0',
        cost: 296853000
      },
      {
        id: 2,
        name: 'LTZ 2.4',
        cost: 243732500
      }
    ],
    image: {
      large: `${window.location.origin}/image/picture/testPicture/Cars/Labo.png`,
    }

  },
  {
    id: 6,
    name: 'Malibu',
    engine:[
      {
        id: 1,
        name: 'LTZ turbo 2.0',
        cost: 292853000
      },
      {
        id: 2,
        name: 'LTZ 2.4',
        cost: 246332500
      }
    ],
    image: {
      large: `${window.location.origin}/image/picture/testPicture/Cars/Malibu.png`,
    }

  },
  {
    id: 7,
    name: 'Nexia',
    engine:[
      {
        id: 1,
        name: 'LTZ turbo 2.0',
        cost: 299853000
      },
      {
        id: 2,
        name: 'LTZ 2.4',
        cost: 246732500
      }
    ],
    image: {
      large: `${window.location.origin}/image/picture/testPicture/Cars/Nexia.png`,
    }

  },
  {
    id: 8,
    name: 'Spark',
    engine:[
      {
        id: 1,
        name: 'LS M/T',
        cost: 66602502
      },
      {
        id: 2,
        name: 'LT A/T',
        cost: 76745952
      }
    ],
    image: {
      large: `${window.location.origin}/image/picture/testPicture/Cars/Spark.png`,
    }

  },
  {
    id: 9,
    name: 'Tahoe',
    engine:[
      {
        id: 1,
        name: 'LTZ turbo 2.0',
        cost: 299850000
      },
      {
        id: 2,
        name: 'LTZ 2.4',
        cost: 246782500
      }
    ],
    image: {
      large: `${window.location.origin}/image/picture/testPicture/Cars/Tahoe.png`,
    }

  },
  {
    id: 10,
    name: 'Tracker',
    engine:[
      {
        id: 1,
        name: 'LTZ turbo 2.0',
        cost: 295853000
      }
    
    ],
    image: {
      large: `${window.location.origin}/image/picture/testPicture/Cars/Tracker.png`,
    }

  },
  {
    id: 11,
    name: 'Trailblazer',
    engine:[
     {
        id: 1,
        name: 'LTZ turbo 2.0',
        cost: 199853000
      }
    ],
    image: {
      large: `${window.location.origin}/image/picture/testPicture/Cars/Trailblazer.png`,
    }

  },
  {
    id: 12,
    name: '',
    engine:[
      {
        id: 1,
        name: 'LTZ turbo 2.0',
        cost: 899853000
      },
      {
        id: 2,
        name: 'LTZ 2.4',
        cost: 646732500
      }
    ],
    image: {
      large: `${window.location.origin}/image/picture/testPicture/Cars/Traverse.png`,
    }

  }
];


export let month = {
  ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  en: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  uz: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  yз: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
}



export var dataFilial = [
  {
    id: '1',
    type: 'branch',
    title: {
              'en':'Head office',
              'ru':'Головной офис',
              'uz':'Бош офис',
              'oz':'Bosh ofis'
            },
    location: [41.311076, 69.247136],
    img: "/image/Icons/location/Branch_fill.svg",
    baloon: {
      id: '1',
      name: {
                'en':'Head office',
                'ru':'Головной офис',
                'uz':'Бош офис',
                'oz':'Bosh ofis'
            },
      title: '',
      content: 'Вы сможете снять наличность, обналичить денежные средства, просмотреть баланс и многое другое',
      button: 'Проложить маршрут'
      
    },
    address:{
              'en':'Chilanzar dist. Islam Karimov str. 55',
              'ru':'Чиланзарский р-н, улица Ислама Каримова, 55',
              'uz':'Чилонзор тумани, Ислом Каримов кўчаси, 55',
              'oz':'Chilonzor tumani, Islom Karimov ko‘chasi, 55'
            },
    phone: '(+998 71) 214 20 00',
    timeWork: 'пн-пт c 09:00 до 18:00',
    services:{
                'en':['Withdrawal', 'Opening accounts', 'Money transfers', 'Corporate banking', 'Foreign Exchange transactions', 'Savings operations', 'Plastic operations', 'Loans', 'Consultation'],
                'ru':['Снятье наличных', 'Открытие счетов', 'Денежные переводы', 'Обслуживание юр.лиц', 'Валютные операции', 'Вкладные операции', 'Пластиковые операции', 'Кредитование', 'Консультации'],
                'uz':['Нақд пул ечиш', 'Ҳисобрақам очиш', 'Пул ўтказмалари', 'Юр.шахс. хизматлари', 'Валюта операциялари', 'Омонат операциялари', 'Пластиковые операциялари', 'Кредитлар', 'Консультация'],
                'oz':['Naqd pul yechish', 'Hisobraqam ochish', 'Pul o‘tkazmalari', 'Yur.shaxs. xizmatlari', 'Valyuta operatsiyalari', 'Omonat operatsiyalari', 'Plastikovie operatsiyalari', 'Kreditlar', 'Konsultasiya']
            },
    recvizites: {
      'en':['МФО: 001172','ИНН: 207 290 120','ОКОНХ: 282 386 02','ОКЭД: 64190'],
            'ru':['МФО: 001172','ИНН: 207 290 120','ОКОНХ: 282 386 02','ОКЭД: 64190'],
            'uz':['МФО: 001172','ИНН: 207 290 120','ОКОНХ: 282 386 02','ОКЭД: 64190'],
            'oz':['МФО: 001172','ИНН: 207 290 120','ОКОНХ: 282 386 02','ОКЭД: 64190']
    }
  },

  {
    id: '2',
     type: 'branch',
    title: {    
      'en':'Branch',
            'ru':'Мини-банк',
            'uz':'Мини-банк',
            'oz':'Mini-bank'
            },
    location: [41.337661, 69.272609],
    img: "/image/Icons/location/Branch_fill.svg",
    baloon: {
      id: '1',
      name: {
                'en':'Branch Malika',
                'ru':'Центр банковских услуг Малика',
                'uz':'Малика банк хизматлар маркази',
                'oz':'Malika bank xizmatlar markazi'
            },
      title: '',
      content: 'Мини банк обслуживания клиентов, включая банкоматы',
      button: 'Проложить маршрут'
    },
    address:{
                'en':'Tashkent small ring road, 57',
                'ru':'Малая кольцевая дорога, 57',
                'uz':'Кичик Халка Йули, 57',
                'oz':'Kichik Xalka Yuli, 57'
            },
    phone: '(+998 71) 234-01-53',
    timeWork: 'пн-пт c 09:00 до 18:00',
    services:{
                'en':['Withdrawal', 'Opening accounts', 'Money transfers', 'Consultation'],
                'ru':['Снятье наличных', 'Открытие счетов', 'Денежные переводы', 'Консультации'],
                'uz':['Нақд пул ечиш', 'Ҳисобрақам очиш', 'Пул ўтказмалари', 'Консультация'],
                'oz':['Naqd pul yechish', 'Hisobraqam ochish', 'Pul o‘tkazmalari', 'Konsultasiya']
            },
    recvizites: {
                'en':['МФО: 001172','ИНН: 207 290 120','ОКОНХ: 282 386 02','ОКЭД: 64190'],
                'ru':['МФО: 001172','ИНН: 207 290 120','ОКОНХ: 282 386 02','ОКЭД: 64190'],
                'uz':['МФО: 001172','ИНН: 207 290 120','ОКОНХ: 282 386 02','ОКЭД: 64190'],
                'oz':['МФО: 001172','ИНН: 207 290 120','ОКОНХ: 282 386 02','ОКЭД: 64190']
            }
  },
  {
    id: '3',
     type: 'branch',
    title: {
                'en':'Branch',
                'ru':'Мини-банк',
                'uz':'Мини-банк',
                'oz':'Mini-bank'
            },
    location: [41.227614, 69.192259],
    img: "/image/Icons/location/Branch_fill.svg",
    baloon: {
      id: '1',
      name: {
                'en':'Choshtepa Branch',
                'ru':'Центр банковских услуг Чоштепа',
                'uz':'Чоштепа банк хизматлар маркази',
                'oz':'Choshtepa bank xizmatlar markazi'
            },
      title: '',
      content: 'Мини банк обслуживания клиентов',
      button: 'Проложить маршрут'
    },
     address:{
                'en':'Sergeli district, Choshtepa',
                'ru':'Сергелийский р-н, Чоштепа',
                'uz':'Сергелийский тумани, Чоштепа',
                'oz':'Sergeli tumani, Choshtepa'
            },
    phone: '(+998 71) 214 20 00',
    timeWork: 'пн-пт c 09:00 до 18:00',
    services: {
      'en':['Withdrawal', 'Opening accounts', 'Money transfers', 'Consultation'],
            'ru':['Снятье наличных', 'Открытие счетов', 'Денежные переводы', 'Консультации'],
            'uz':['Нақд пул ечиш', 'Ҳисобрақам очиш', 'Пул ўтказмалари', 'Консультация'],
            'oz':['Naqd pul yechish', 'Hisobraqam ochish', 'Pul o‘tkazmalari', 'Konsultasiya']
    },
    recvizites: {
              'en':['МФО: 001172','ИНН: 207 290 120','ОКОНХ: 282 386 02','ОКЭД: 64190'],
              'ru':['МФО: 001172','ИНН: 207 290 120','ОКОНХ: 282 386 02','ОКЭД: 64190'],
              'uz':['МФО: 001172','ИНН: 207 290 120','ОКОНХ: 282 386 02','ОКЭД: 64190'],
              'oz':['МФО: 001172','ИНН: 207 290 120','ОКОНХ: 282 386 02','ОКЭД: 64190']
          }
  }
];


export var dataBankomat = [
  {
    id: '4',
     type: 'atm',
    title:{
                'en':'Head office ATM',
                'ru':'Банкоматы головного офиса',
                'uz':'Бош офис банкоматлари',
                'oz':'Bosh ofis bankomatlari'
            },
    location:[41.311076, 69.247136],
    img: "/image/Icons/location/ATM_fill.svg",
    baloon: {
      id: '1',
      name: {
                'en':'Head office ATM',
                'ru':'Банкоматы головного офиса',
                'uz':'Бош офис банкоматлари',
                'oz':'Bosh ofis bankomatlari'
            },
      title: 'Принимает VISA / Humo / UzCard / ChinaUnionPay',
      content: 'Вы сможете снять наличность, обналичить денежные средства, просмотреть баланс и многое другое',
      button: 'Проложить маршрут'
    },
    address:{
                'en':'Chilanzar dist. Islam Karimov str. 55',
                'ru':'Чиланзарский р-н, улица Ислама Каримова, 55',
                'uz':'Чилонзор тумани, Ислом Каримов кўчаси, 55',
                'oz':'Chilonzor tumani, Islom Karimov ko‘chasi, 55'
            },
    phone: '(+998 71) 214 20 00',
    timeWork: '24/7',
    services: {
       'en':['Cash withdrawal', 'SMS Notification', 'Payment for services', 'Balance view', 'PIN Change', 'Currency Exchange', 'Purchase History'],
                'ru':['Снятье наличных', 'СМС Информирование', 'Оплата услуг', 'Просмотр баланса', 'Смена PIN', 'Обмен валюты', 'История покупок'],
                'uz':['Нақд пул ечиш', 'СМС-хабар', 'Хизматлар учун тўлов', 'Баланс кўриниши', 'ПИН ўзгартириши', 'Валюта айирбошлаш', 'Пластик тарихи'],
                'oz':['Naqd pul yechish', 'SMS-xabar', 'Xizmatlar uchun to‘lov', 'Balans ko‘rinishi', 'PIN o‘zgartirishi', 'Valyuta ayirboshlash', 'Plastik tarixi']
    },
    recvizites: {
      'en':['To report a problem with an ATM, call +998 71 2142001'],
                'ru':['При возникновении сбоя или каких-либо проблем, обратитесь по номеру +998 71 2142001'],
                'uz':['Агар бирон бир носозлик ёки бирон бир муаммо юзага келса, илтимос, +998 71 2142001 рақамига қўнғироқ қилинғ'],
                'oz':["Agar biron bir nosozlik yoki biron bir muammo yuzaga kelsa, iltimos, +998 71 2142001 raqamiga qo'ng'iroq qiling"]
    }
  },
  
  {
    id: '5',
    type: 'atm',
    location:[41.337661, 69.272609],
        title:{
                'en':'Malika Branch ATM',
                'ru':'Банкоматы Мини-банка Малика',
                'uz':'Мини-банк Малика банкоматлари',
                'oz':'Mini-bank Malika bankomatlari'
            },
    img: "/image/Icons/location/ATM_fill.svg",
    baloon: {
      id: '1',
      name: {
                'en':'Malika Branch ATM',
                'ru':'Банкоматы Мини-банка Малика',
                'uz':'Мини-банк Малика банкоматлари',
                'oz':'Mini-bank Malika bankomatlari'
            },
      title: 'Принимает VISA / Humo / UzCard / ChinaUnionPay',
      content: 'Вы сможете снять наличность, обналичить денежные средства, просмотреть баланс и многое другое',
      button: 'Проложить маршрут'
    },
    address: {
                'en':'Tashkent small ring road, 57',
                'ru':'Малая кольцевая дорога, 57',
                'uz':'Кичик Халка Йули, 57',
                'oz':'Kichik Xalka Yuli, 57'
            },
    phone: '(+998 71) 234 01 53',
    timeWork: 'пн-пт c 09:00 до 18:00',
    services:{
            'en':['Cash withdrawal', 'SMS Notification', 'Payment for services', 'Balance view', 'PIN Change', 'Currency Exchange', 'Purchase History'],
            'ru':['Снятье наличных', 'СМС Информирование', 'Оплата услуг', 'Просмотр баланса', 'Смена PIN', 'Обмен валюты', 'История покупок'],
            'uz':['Нақд пул ечиш', 'СМС-хабар', 'Хизматлар учун тўлов', 'Баланс кўриниши', 'ПИН ўзгартириши', 'Валюта айирбошлаш', 'Пластик тарихи'],
            'oz':['Naqd pul yechish', 'SMS-xabar', 'Xizmatlar uchun to‘lov', 'Balans ko‘rinishi', 'PIN o‘zgartirishi', 'Valyuta ayirboshlash', 'Plastik tarixi']
            },
         recvizites:{
            'en':['To report a problem with an ATM, call +998 71 2142001'],
            'ru':['При возникновении сбоя или каких-либо проблем, обратитесь по номеру +998 71 2142001'],
            'uz':['Агар бирон бир носозлик ёки бирон бир муаммо юзага келса, илтимос, +998 71 2142001 рақамига қўнғироқ қилинғ'],
            'oz':["Agar biron bir nosozlik yoki biron bir muammo yuzaga kelsa, iltimos, +998 71 2142001 raqamiga qo'ng'iroq qiling"]
         },
  },
  {
    id: '6',
    type: 'atm',
    title: {
                'en':'ATM',
                'ru':'Банкомат',
                'uz':'Банкомат',
                'oz':'Bankomat'
            },
    location:[41.232472, 69.334687],
    img: "/image/Icons/location/ATM_fill.svg",
    baloon: {
      id: '1',
      name:{
                'en':'ATM',
                'ru':'Банкомат',
                'uz':'Банкоматлари',
                'oz':'Bankomatlari'
            },
      title: 'Принимает VISA / Humo / UzCard / ChinaUnionPay',
      content: 'Вы сможете снять наличность, обналичить денежные средства, просмотреть баланс и многое другое',
      button: 'Проложить маршрут'
    },
    address:{
                'en':'1-y tupik Djurabeka Astonova, 3',
                'ru':'1-й тупик Джурабека Астонова, 3',
                'uz':'1-й тупик Джурабека Астонова, 3',
                'oz':'1-y tupik Djurabeka Astonova, 3'
            },
    phone: '(+998 71) 214 20 00',
    timeWork: 'пн-пт c 09:00 до 18:00',
    services:{
            'en':['Cash withdrawal', 'SMS Notification', 'Payment for services', 'Balance view', 'PIN Change', 'Currency Exchange', 'Purchase History'],
            'ru':['Снятье наличных', 'СМС Информирование', 'Оплата услуг', 'Просмотр баланса', 'Смена PIN', 'Обмен валюты', 'История покупок'],
            'uz':['Нақд пул ечиш', 'СМС-хабар', 'Хизматлар учун тўлов', 'Баланс кўриниши', 'ПИН ўзгартириши', 'Валюта айирбошлаш', 'Пластик тарихи'],
            'oz':['Naqd pul yechish', 'SMS-xabar', 'Xizmatlar uchun to‘lov', 'Balans ko‘rinishi', 'PIN o‘zgartirishi', 'Valyuta ayirboshlash', 'Plastik tarixi']
            },
        recvizites:{
            'en':['To report a problem with an ATM, call +998 71 2142001'],
            'ru':['При возникновении сбоя или каких-либо проблем, обратитесь по номеру +998 71 2142001'],
            'uz':['Агар бирон бир носозлик ёки бирон бир муаммо юзага келса, илтимос, +998 71 2142001 рақамига қўнғироқ қилинғ'],
            'oz':["Agar biron bir nosozlik yoki biron bir muammo yuzaga kelsa, iltimos, +998 71 2142001 raqamiga qo'ng'iroq qiling"]
        },
  },
  {
    id: '8',
    type: 'atm',
    title: {
                'en':'ATM',
                'ru':'Банкомат',
                'uz':'Банкомат',
                'oz':'Bankomat'
            },
    location:[41.040987, 69.357129],
    img: "/image/Icons/location/ATM_fill.svg",
    baloon: {
      id: '1',
      name:{
                'en':'ATM',
                'ru':'Банкомат',
                'uz':'Банкоматлари',
                'oz':'Bankomatlari'
            },
      title: 'Принимает VISA / Humo / UzCard / ChinaUnionPay',
      content: 'Вы сможете снять наличность, обналичить денежные средства, просмотреть баланс и многое другое',
      button: 'Проложить маршрут'
    },
    address:{
                'en':'Tashkent region, Nurafshon',
                'ru':'Ташкентская область, Нурафшон',
                'uz':'Тошкент вилояти, Нурафшон',
                'oz':'Toshkent viloyati, Nurafshon'
            },
    phone: '(+998 71) 214 20 01',
    timeWork: 'пн-пт c 09:00 до 18:00',
    services:{
                'en':['Cash withdrawal', 'SMS Notification', 'Payment for services', 'Balance view', 'PIN Change', 'Currency Exchange', 'Purchase History'],
                'ru':['Снятье наличных', 'СМС Информирование', 'Оплата услуг', 'Просмотр баланса', 'Смена PIN', 'Обмен валюты', 'История покупок'],
                'uz':['Нақд пул ечиш', 'СМС-хабар', 'Хизматлар учун тўлов', 'Баланс кўриниши', 'ПИН ўзгартириши', 'Валюта айирбошлаш', 'Пластик тарихи'],
                'oz':['Naqd pul yechish', 'SMS-xabar', 'Xizmatlar uchun to‘lov', 'Balans ko‘rinishi', 'PIN o‘zgartirishi', 'Valyuta ayirboshlash', 'Plastik tarixi']
            },
        recvizites:{
            'en':['To report a problem with an ATM, call +998 71 2142001'],
            'ru':['При возникновении сбоя или каких-либо проблем, обратитесь по номеру +998 71 2142001'],
            'uz':['Агар бирон бир носозлик ёки бирон бир муаммо юзага келса, илтимос, +998 71 2142001 рақамига қўнғироқ қилинғ'],
            'oz':["Agar biron bir nosozlik yoki biron bir muammo yuzaga kelsa, iltimos, +998 71 2142001 raqamiga qo'ng'iroq qiling"]
        },
  },
  {
    id: '9',
    type: 'atm',
    title: {
                'en':'ATM',
                'ru':'Банкомат',
                'uz':'Банкомат',
                'oz':'Bankomat'
            },
    location:[41.041385,69.357764],
    img: "/image/Icons/location/ATM_fill.svg",
    baloon: {
      id: '1',
      name:{
                'en':'ATM',
                'ru':'Банкомат',
                'uz':'Банкоматлари',
                'oz':'Bankomatlari'
            },
      title: 'Принимает VISA / Humo / UzCard / ChinaUnionPay',
      content: 'Вы сможете снять наличность, обналичить денежные средства, просмотреть баланс и многое другое',
      button: 'Проложить маршрут'
    },
    address:{
                'en':'Tashkent region, Nurafshon',
                'ru':'Ташкентская область, Нурафшон',
                'uz':'Тошкент вилояти, Нурафшон',
                'oz':'Toshkent viloyati, Nurafshon'
            },
    phone: '(+998 71) 214 20 01',
    timeWork: 'пн-пт c 09:00 до 18:00',
    services:{
                'en':['Cash withdrawal', 'SMS Notification', 'Payment for services', 'Balance view', 'PIN Change', 'Currency Exchange', 'Purchase History'],
                'ru':['Снятье наличных', 'СМС Информирование', 'Оплата услуг', 'Просмотр баланса', 'Смена PIN', 'Обмен валюты', 'История покупок'],
                'uz':['Нақд пул ечиш', 'СМС-хабар', 'Хизматлар учун тўлов', 'Баланс кўриниши', 'ПИН ўзгартириши', 'Валюта айирбошлаш', 'Пластик тарихи'],
                'oz':['Naqd pul yechish', 'SMS-xabar', 'Xizmatlar uchun to‘lov', 'Balans ko‘rinishi', 'PIN o‘zgartirishi', 'Valyuta ayirboshlash', 'Plastik tarixi']
            },
        recvizites:{
            'en':['To report a problem with an ATM, call +998 71 2142001'],
            'ru':['При возникновении сбоя или каких-либо проблем, обратитесь по номеру +998 71 2142001'],
            'uz':['Агар бирон бир носозлик ёки бирон бир муаммо юзага келса, илтимос, +998 71 2142001 рақамига қўнғироқ қилинғ'],
            'oz':["Agar biron bir nosozlik yoki biron bir muammo yuzaga kelsa, iltimos, +998 71 2142001 raqamiga qo'ng'iroq qiling"]
        },
  },
  {
    id: '10',
    type: 'atm',
    title: {
                'en':'ATM',
                'ru':'Банкомат',
                'uz':'Банкомат',
                'oz':'Bankomat'
            },
    location:[41.314002, 69.249110],
    img: "/image/Icons/location/ATM_fill.svg",
    baloon: {
      id: '1',
      name:{
                'en':'Hilton ATM',
                'ru':'Банкомат Hilton',
                'uz':'Банкоматлари Hilton',
                'oz':'Bankomatlari Hilton'
            },
      title: 'Принимает VISA / Humo / UzCard / ChinaUnionPay',
      content: 'Вы сможете снять наличность, обналичить денежные средства, просмотреть баланс и многое другое',
      button: 'Проложить маршрут'
    },
     address:{
                'en':'Islam Karimov str., 2',
                'ru':'улица Ислама Каримова, 2',
                'uz':'Ислом Каримов кучаси, 2',
                'oz':'Islom Karimov kuchasi, 2'
            },
    phone: '(+998 71) 214 20 01',
    timeWork: 'пн-пт c 09:00 до 18:00',
    services:{
                'en':['Cash withdrawal', 'SMS Notification', 'Payment for services', 'Balance view', 'PIN Change', 'Currency Exchange', 'Purchase History'],
                'ru':['Снятье наличных', 'СМС Информирование', 'Оплата услуг', 'Просмотр баланса', 'Смена PIN', 'Обмен валюты', 'История покупок'],
                'uz':['Нақд пул ечиш', 'СМС-хабар', 'Хизматлар учун тўлов', 'Баланс кўриниши', 'ПИН ўзгартириши', 'Валюта айирбошлаш', 'Пластик тарихи'],
                'oz':['Naqd pul yechish', 'SMS-xabar', 'Xizmatlar uchun to‘lov', 'Balans ko‘rinishi', 'PIN o‘zgartirishi', 'Valyuta ayirboshlash', 'Plastik tarixi']
            },
        recvizites:{
            'en':['To report a problem with an ATM, call +998 71 2142001'],
            'ru':['При возникновении сбоя или каких-либо проблем, обратитесь по номеру +998 71 2142001'],
            'uz':['Агар бирон бир носозлик ёки бирон бир муаммо юзага келса, илтимос, +998 71 2142001 рақамига қўнғироқ қилинғ'],
            'oz':["Agar biron bir nosozlik yoki biron bir muammo yuzaga kelsa, iltimos, +998 71 2142001 raqamiga qo'ng'iroq qiling"]
        },
  }
];