import xss from 'xss';

const removeHtmlTags = (html: string): string => xss(html).replace(/(<([^>]+)>)/gi, '') ?? '';

export default removeHtmlTags;
