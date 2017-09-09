export interface IEvent {
  title: string
  desc: string
  phone?: string
  mail: string
}

const events: IEvent[] = [{
  title: 'Innebandy Missionskyrkan',
  desc: `Vi spelar innebandy tillsammans, blandade lag. Klubbor finns att låna men idrottskläder och träningsskor för inomhusbruk får varje person ta med själv.\n 
  Omklädningsrum och duschmöjlighet finns.`,
  mail: 'matco273@student.liu.se'
}, {
  title: 'Linköping GIF',
  desc: `Friidrott\n
  Campushallen oktober-april, Campus Valla ute maj-september`,
  phone: 'Mona 073-921 03 50',
  mail: 'kansli@lgif.se'
}, {
  title: 'Linköpings fäktklubb',
  desc: `Välkommen till en global idrott med internationell atmosfär och undervisning på engelska!\n
  Hos oss trivs blivande och aktiva fäktare från världens alla hörn. Linköpings Fäktklubb står för glädje och gemenskap, hög kvalitet, \n
  respekt och en miljö där alla får utvecklas. Alla är välkomna i vår fina fäktfamilj!\n 
  Vi ordnar Prova på-fäktning för skolklasser (kostnadsfritt) och erbjuder också individuellt deltagande i ordinarie fäktskola dvs våra nybörjarkurser.\n
  Fäkthallen, Furirgatan 21 (T1) i Linköping`,
  mail: 'info@linkopingsfaktklubb.se'
}]

export default events
