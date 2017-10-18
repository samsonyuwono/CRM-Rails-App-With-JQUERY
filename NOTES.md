1. Allow user to click next on company show page to sift through their companies - show resource

2.  Clicking on a Company will render all leads/contacts of the company to show without a page refresh

3. Above will achieve this requirement

4. User will be able to add notes to a account/customer



10/16 EOD
- build comment section for lead or company show page

Build Comments for each Company show page
- Create form
- Create new controller and actions for comments
- Create new comments model
- Create new comments serializer

<!-- <h3>Comments</h3>
<%= form_for @comment do |f| %>
  <label>Add a comment:</label>
  <%= f.text_field :text %>
  <%= f.hidden_field :user_id, value: current_user.id %>
  <span id= "company-field">
    <%= f.hidden_field :country_id, value: @company.id %>
  </span>
  <%= f.submit "Submit", id: "submit" %>
<% end %> -->

Stretch

Decide where to add comments after all other requirements are achieved
- Make each lead in drop-down menu clickable
