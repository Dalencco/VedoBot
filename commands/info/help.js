const { Message, Client, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const { readdirSync } = require("fs");
const ms = require('ms');

module.exports = {
    name: "help",
    aliases: ['h'],
    description: "Comando de Ayuda",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {

        const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "RED"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "Comando sin nombre.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 ¿Necesitas ayuda? Aqui la lista completa de mis comandos:")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` para obtener informacion sobre algun comando. Por ejemplo: \`${prefix}help help\`.\nDesarrollado por Kento : © Vedo Software Development LLC 2022`
        )
        .setFooter(
          `Requerido por ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.reply({ embeds: [embed] });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`<:netting_mal:858849837982416896> | ¡Comando no valido! Use \`${prefix}help\` para ver todos los comandos`)
          .setColor("FF0000")
          .setFooter(
            `Requerido por ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()

        return message.reply({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setTitle("Detalles del Comando:")
        .addField("Prefix:", `\`${prefix}\``)
        .addField(
          "Comando:",
          command.name ? `\`${command.name}\`` : "El comando no tiene nombre."
        )
        .addField(
          "Aliases:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "El comando no tiene aliases."
        )
        .addField(
          "Uso:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Cooldown:",
          command.cooldown
            ? `\`${ms(command.cooldown, { long: false })}\``
            : "No tiene Cooldown"
        )
        .addField(
          "Descripcion:",
          command.description
            ? command.description
            : "El comando no tiene descripcion."
        )
        .setFooter(
          `Requerido por ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.reply({ embeds: [embed] });
    }

    },
};
