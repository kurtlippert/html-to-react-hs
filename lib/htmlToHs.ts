import { Box } from '../lib/box'

export const htmlToHs = (htmlString: string) =>

  // Manipulate Tag Text
  Box(htmlString.replace(/(>)([^<]*)(<)/g,
    (_: string, __: string, p2: string) =>
      p2.replace(/\s+/g, '') === '' ? `>${p2}<` :
        `> '${p2.replace('\'', '\\\'')}'<`))

  // Input tags are special (no closing /)
  .map((s: string) => s.replace(/<input ([^>]*)/g, 'input({ $1)'))

  // Replace =" with : '
  .map((s: string) => s.replace(/="/g, ': \''))

  // Checking for attributes that will need to be lead by commas
  // (i.e. all of them except for the first)
  .map((s: string) => s.replace(/"(\s+)(\w+)/g, '\', $2'))

  // Checking for attributes that need to be followed by })
  // (i.e only the last attribute in the list)
  .map((s: string) => s.replace(/"(\s*)\//g, '\' })'))

  // At this point, replace any double-quotes with ' }
  // We know that the only double-quotes left are to be followed by }
  .map((s: string) => s.replace(/"/g, '\' }'))

  // Any attribute-less, one-line, non-self-closing tag
  .map((s: string) => s.replace(/<(\w+)(\s*)><\/(\w+)>/g, '$1({}),'))

  // Any attribute-less, one-line, tag (opening)
  .map((s: string) => s.replace(/<(\w+)(\s*)>/g, '$1({},'))

  // Start of a tag
  .map((s: string) => s.replace(/<(\w+)/g, '$1({'))

  // That awkward space between the end of tag and beginning of new tag
  .map((s: string) => s.replace(/}(>)(\s*)</g, '}),$2<'))

  // At this point, replace all left-angle barckets with a comma
  .map((s: string) => s.replace(/>/g, ','))

  // Start of the end of a tag
  .map((s: string) => s.replace(/<\/(\w+)/g, ')'))

  // Any starting tag (at this point), with a gap of 2+ spaces before attributes
  .map((s: string) => s.replace(/(\w+)\({[\s]{2,}/g, '$1({ '))

  // remove space between ) and ,
  .map((s: string) => s.replace(/\)\s+,/g, '),'))

  // remove duplicate ), when present
  .map((s: string) => s.replace(/\),\),/g, '),'))

  // modify aria labels so they are surrounded with '
  .map((s: string) => s.replace(/(aria-\w+):/g, '\'$1\':'))

  // class to className
  .map((s: string) => s.replace(/(\s+)(class):/g, '$1className:'))

  // for to htmlFor
  .fold((s: string) => s.replace(/(\s+)(for):/g, '$1htmlFor:'))

  // return r
// }
