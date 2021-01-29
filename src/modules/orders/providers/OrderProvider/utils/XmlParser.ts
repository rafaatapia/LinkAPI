import fs from 'fs';
import path from 'path';

import IRequestCreateOrderDTO from '../dtos/IRequestCreateOrderDTO';

function replaceXml(originalString: string, template: string, value: string) {
  return originalString.replace(`#[${template}]`, value);
}

export default async function jsonToXmlOrder(
  json: IRequestCreateOrderDTO,
): Promise<string> {
  const xmlTemplatePath = path.resolve(__dirname, 'templates', 'xml_order.xml');
  const xmlFileTemplate = await fs.promises.readFile(xmlTemplatePath, {
    encoding: 'utf-8',
  });

  let xml = replaceXml(xmlFileTemplate, 'CLIENTE_NOME', json.customer.nome);
  xml = replaceXml(xml, 'ITEM_CODIGO', json.itens[0].codigo);
  xml = replaceXml(xml, 'ITEM_DESCRICAO', json.itens[0].descricao);
  xml = replaceXml(xml, 'ITEM_QTDE', json.itens[0].qtde.toString());
  xml = replaceXml(xml, 'ITEM_VLR_UNIT', json.itens[0].vlr_unit.toString());
  xml = replaceXml(xml, 'PARCELA_VLR', json.parcelas[0].vlr.toString());
  xml = replaceXml(xml, 'VOLUME_SERVICO', json.volumes[0].servico);

  xml = xml.replace(/\r?\n|\r/g, '');

  return xml;
}
