export const htmlToHs = (htmlString: string) => {

  // Manipulate Tag Text
  const a = htmlString.replace(/(>)([^<]*)(<)/g,
    (_: string, __: string, p2: string) =>
      p2.replace(/\s+/g, '') === '' ? `>${p2}<` :
        `> '${p2.replace('\'', '\\\'')}'<`)

  // Input tags are special (no closing /)
  const b = a.replace(/<input ([^>]*)/g, 'input({ $1)')

  // Replace =" with : '
  const c = b.replace(/="/g, ': \'')

  // Checking for attributes that will need to be lead by commas
  // (i.e. all of them except for the first)
  const d = c.replace(/"(\s+)(\w+)/g, '\', $2')

  // Checking for attributes that need to be followed by })
  // (i.e only the last attribute in the list)
  const e = d.replace(/"(\s*)\//g, '\' })')

  // At this point, replace any double-quotes with ' }
  // We know that the only double-quotes left are to be followed by }
  const f = e.replace(/"/g, '\' }')

  // Any attribute-less, one-line, non-self-closing tag
  const g = f.replace(/<(\w+)(\s*)><\/(\w+)>/g, '$1({}),')

  // Any attribute-less, one-line, tag (opening)
  const h = g.replace(/<(\w+)(\s*)>/g, '$1({},')

  // Start of a tag
  const i = h.replace(/<(\w+)/g, '$1({')

  // That awkward space between the end of tag and beginning of new tag
  const j = i.replace(/}(>)(\s*)</g, '}),$2<')

  // At this point, replace all left-angle barckets with a comma
  const k = j.replace(/>/g, ',')

  // Start of the end of a tag
  const l = k.replace(/<\/(\w+)/g, ')')

  // Any starting tag (at this point), with a gap of 2+ spaces before attributes
  const m = l.replace(/(\w+)\({[\s]{2,}/g, '$1({ ')

  // remove space between ) and ,
  const n = m.replace(/\)\s+,/g, '),')

  // remove duplicate ), when present
  const o = n.replace(/\),\),/g, '),')

  // modify aria labels so they are surrounded with '
  const p = o.replace(/(aria-\w+):/g, '\'$1\':')

  // class to className
  const q = p.replace(/(\s+)(class):/g, '$1className:')

  // for to htmlFor
  const r = q.replace(/(\s+)(for):/g, '$1htmlFor:')

  return r
}
