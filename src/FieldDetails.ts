import ClassDetails from "./ClassDetails";
import Helpers from "./Helpers";
import NamespaceDetails from "./NamespaceDetails";

export default class FieldDetails {
    public name: string = "";
    public before: string = "";
    public after: string = "";
    public template: string = "";
    public class:ClassDetails|null = null;
    public namespace:NamespaceDetails|null = null;
    public start: number = -1;
    public end: number = -1;

    private static TEMPLATE =  {
        getter: `variableType get_variableName() const { return variableName; }`,
        setter: `void set_variableName(variableTypep_variableName) { variableName = p_variableName; }`
    }

    /**
     * Get Getter Setter code
     *
     * @returns string
     */
    public generateGetterSetter(): string
    {
        let out = "";
        out += this.generateGetter() + "\n";
        out += this.generateSetter();
        return out;
    }
    /**
     * Get Getter code
     *
     * @returns string
     */
    public generateGetter(): string
    {
        let vt = this.before.trim();
        let vn = this.name.trim();
        var tmp = FieldDetails.TEMPLATE["getter"];

        return tmp.replace(/variableType/g, vt).replace(/variableName/g, vn);
    }
    /**
     * Get Setter code
     *
     * @returns string
     */
    public generateSetter(): string
    {
        let vt = this.before.trim();
        let vn = this.name.trim();
        var tmp = FieldDetails.TEMPLATE["setter"];
        if(vt == "String" || vt == "StringName")
        {
            vt = "const " + vt + " &";
        }
        else
        {
            vt += " "
        }

        return tmp.replace(/variableType/g, vt).replace(/variableName/g, vn);
    }

    /**
     * Get bind code
     *
     * @returns string
     */
// ADD_PROPERTY(PropertyInfo(Variant::ARRAY, "igc_property_list"), "set_igc_property_list", "get_igc_property_list");
    public generateBindCode(): string
    {
        let tmp = this.getPropBindTemplate();
        let vn = this.name.trim();
        return tmp.replace(/variableName/g, vn);
    }

    private getPropBindTemplate(): string
    {
        const map :{[key:string]:string} = {
            "int":"INT",
            "float":"REAL",
            "bool":"BOOL",
            "String":"STRING",
            "StringName":"STRING",
            "Array":"ARRAY"
        };
        let out = 'ADD_PROPERTY(PropertyInfo(Variant::';
        let vt = this.before.trim();
        if (vt in map)
        {
            out += map[vt];
            out +=', "variableName")'
        }
        else if (vt == "Variant")
        {
            out += 'NIL, "variableName", PROPERTY_HINT_NONE, "", PROPERTY_USAGE_NIL_IS_VARIANT)'
        }
        else
        {
            vt = vt.replace("Ref<", "").replace(">", "")
            let tmp = `
            {
                PropertyInfo pi = PropertyInfo("variableType");
                pi.name = "variableName";
                ADD_PROPERTY(pi, "set_variableName", "get_variableName");
            }
            `.replace(/variableType/g, vt)
            return tmp;
        }
        out += ', "set_variableName", "get_variableName");'
        return out;
    }

    /**
     * Template parameter names only.
     */
    public getTemplateNames(): string {
        return Helpers.templateNames(this.template).join(', ');
    }

    /**
     * Template parameters including parameter type.
     */
    public getTemplateParameters(): string {
        return Helpers.templateParameters(this.template).join(', ');
    }

    /**
     * Get namespace of function.
     */
    public getNamespace(): NamespaceDetails|null {
        if (this.class) {
            return this.class.namespace;
        }
        return this.namespace;
    }

    /**
     * Parse functions
     *
     * @param source
     */
    public static parseFields(source:string) : Array<FieldDetails> {
        source = source.replace(/\/\/[^\n^\r]+/g, function (mat) {
            return '/'.repeat(mat.length);
        });
        let result:FieldDetails[] = [];

        let fieldRegexStr = "([\\w_][\\w\\d<>_:]*\\**\\&{0,2}\\s+\\**\\&{0,2})([\\w_][\\w\\d_]*)\\s*;";
        let regex = new RegExp(fieldRegexStr, 'gm');
        let match = null;
        while (match = regex.exec(source)) {
            let fieldDetails = new FieldDetails;
            fieldDetails.template = "";
            fieldDetails.name = match[2];
            fieldDetails.before = match[1];
            fieldDetails.after = "";
            fieldDetails.start = match.index;
            fieldDetails.end = match.index + match[0].length;
            result.push(fieldDetails);
        }
        return result;
    }
}
