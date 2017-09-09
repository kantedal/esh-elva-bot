const resBeginner: string = `
  A good resource for learning Swedish as a beginner is Swedish for Immigrants (SFI), offered by Linköping.\n
  You do not need any previous knowledge of Swedish and have a right to attend.\n
  Read more at http://www.linkoping.se/forskola-och-utbildning/vuxenutbildning/sfi---svenska-for-invandrare/\n
`

const resIntermediate: string = `
  For intermediate learners of Swedish, there is a variaty of language cafées in Linköping!\n
  At language cafées you can practice your Swedish with other learners of the language as well as native speakers.\n\n
  Some cafées:\n
  Johanneskyrkan, contact Susanne Gustafsson at susgus61@gmail.com or at 0766 238 209.\n
  Nygårdskyrkan Skäggetorp, contact johannes@skaggetorp.net or 070 490 1181\n
  Språkcafé Ryttargårdskyrkan, contact Språkcafé Ryttargårdskyrkan at maria.landalv@ryttargardskyrkan.se or 013 314 190.
`

const resAdvanced: string = resIntermediate

const swedishDirectionsByDifficulty = {
  beginner: resBeginner,
  intermediate: resIntermediate,
  advanced: resAdvanced
}

export default swedishDirectionsByDifficulty
