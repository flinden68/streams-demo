export class Todo {
  private _id: string;
  private subject: string;
  private description:string;
  private created: Date;
  private completed: boolean;
  private _class: string;

  constructor(id: string, subject: string, description: string) {
    if(id  != null) {
      this._id = id;
    }
    this.subject = subject;
    this.description = description;

    this._class = "nl.elstarit.demo.streams.domain.Todo";
  }

  public setCreated(date: Date){
    this.created = date;
  }

  public setCompleted(completed : boolean){
    this.completed = completed;
  }

}
