import NamespaceDetails from "./NamespaceDetails";
import FunctionDetails from "./FunctionDetails";
import ClassDetails from "./ClassDetails";
import FieldDetails from "./FieldDetails";

/**
 * Container of parsed details.
 */
export default class Container {
    public namespaces : Array<NamespaceDetails> = [];
    public classes : Array<ClassDetails> = [];
    public functions : Array<FunctionDetails> = [];
    public fields : Array<FieldDetails> = [];

    public constructor (code: string) {
        this.namespaces = NamespaceDetails.parseNamespaces(code);
        this.classes = ClassDetails.parseClasses(code);
        this.functions = FunctionDetails.parseFunctions(code);
        this.fields = FieldDetails.parseFields(code);

        for (let i in this.classes) { // Set namespace of classes
            for (let j in this.namespaces) {
                if (this.classes[i].start > this.namespaces[j].start && this.classes[i].end < this.namespaces[j].end) {
                    this.classes[i].namespace = this.namespaces[j];
                }
            }
        }

        for (let i in this.functions) { // Set classes of methods
            for (let j in this.classes) {
                if (this.functions[i].start > this.classes[j].start && this.functions[i].end < this.classes[j].end) {
                    this.functions[i].class = this.classes[j];
                }
            }
            if (this.functions[i].class === null) { // Set namespace of non-member functions
                for (let j in this.namespaces) {
                    if (this.functions[i].start > this.namespaces[j].start && this.functions[i].end < this.namespaces[j].end) {
                        this.functions[i].namespace = this.namespaces[j];
                    }
                }
            }
            if (parseInt(i) > 0) {
                this.functions[i].previouses = this.functions.slice(0, parseInt(i));
            }
        }
    }

    /**
     * Get function details in specifed position.
     *
     * @param position
     */
    public findClass (position: number) : ClassDetails|null {
        for (let i in this.classes) {
            if (position >= this.classes[i].start && position <= this.classes[i].end) {
                return this.classes[i];
            }
        }
        return null;
    }

    /**
     * Get function details in specifed position.
     *
     * @param position
     */
    public findFunction (position: number) : FunctionDetails|null {
        for (let i in this.functions) {
            if (position >= this.functions[i].start && position <= this.functions[i].end) {
                return this.functions[i];
            }
        }
        return null;
    }

    /**
     * Get field details in specifed position.
     *
     * @param position
     */
    public findField (position: number) : FieldDetails|null {
        for (let i in this.fields) {
            if (position >= this.fields[i].start && position <= this.fields[i].end) {
                return this.fields[i];
            }
        }
        return null;
    }
}
