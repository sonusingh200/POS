// Sidebar scroll indicator

document.addEventListener('DOMContentLoaded', function () {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const sideMenu = document.querySelector('.side_menu');

  function updateScrollIndicator() {
    if (sideMenu) {
      const scrollTop = sideMenu.scrollTop;
      const scrollHeight = sideMenu.scrollHeight;
      const clientHeight = sideMenu.clientHeight;

      if (scrollHeight > clientHeight) {
        if (scrollTop > 0) {
          scrollIndicator.classList.remove('show');
        } else {
          scrollIndicator.classList.add('show');
        }
      } else {
        scrollIndicator.classList.remove('show');
      }
    }
  }

  updateScrollIndicator();
  sideMenu?.addEventListener('scroll', updateScrollIndicator);
  window?.addEventListener('resize', updateScrollIndicator);
});

// On click actions

function toggleDropdown(button) {
  event.stopPropagation();
  const dropdownContent = button.nextElementSibling;

  document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
    if (dropdown !== dropdownContent) {
      dropdown.classList.remove("show");
    }
  });

  dropdownContent.classList.toggle("show");
}

document.addEventListener("click", function () {
  document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
    dropdown.classList.remove("show");
  });
});

document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
  dropdown.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

function toggleDropdown(id) {
  document.getElementById(id).classList.toggle("show");
}
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".dropdown-btn").forEach(button => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      let dropdown = this.nextElementSibling;
      document.querySelectorAll(".dropdown-content").forEach(menu => {
        if (menu !== dropdown) menu.classList.remove("show");
      });
      dropdown.classList.toggle("show");
    });
  });
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-content").forEach(menu => {
        menu.classList.remove("show");
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const exportBtn = document.getElementById("exportBtn");
  const exportDropdown = document.getElementById("exportDropdown");
  exportBtn.addEventListener("click", function (event) {
    exportDropdown.style.display = exportDropdown.style.display === "block" ? "none" : "block";
    event.stopPropagation();
  });
  document.addEventListener("click", function (event) {
    if (!exportBtn.contains(event.target) && !exportDropdown.contains(event.target)) {
      exportDropdown.style.display = "none";
    }
  });
});

// Delete invoice confirmation popup and action dropdown close automatically when delete invoice clicked 

document.addEventListener("DOMContentLoaded", function () {
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  const deleteModal = document.getElementById("deleteModal");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");
  const actionButtons = document.querySelectorAll(".dropdown-btn");

  if (deleteBtns.length > 0) {
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
          dropdown.style.display = "none";
        });
        if (deleteModal) {
          deleteModal.style.display = "flex";
        }
      });
    });
  }

  if (confirmDelete) {
    confirmDelete.addEventListener("click", function () {
      alert("Invoice deleted!");
      if (deleteModal) {
        deleteModal.style.display = "none";
      }
    });
  }

  if (cancelDelete) {
    cancelDelete.addEventListener("click", function () {
      if (deleteModal) {
        deleteModal.style.display = "none";
      }
    });
  }

  if (actionButtons.length > 0) {
    actionButtons.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        const dropdown = btn.nextElementSibling;
        document.querySelectorAll(".dropdown-content").forEach((content) => {
          if (content !== dropdown) {
            content.style.display = "none";
          }
        });
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      });
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === deleteModal) {
      if (deleteModal) {
        deleteModal.style.display = "none";
      }
    }
    document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
      dropdown.style.display = "none";
    });
  });
});

// Cancel invoice confirmation popup and action dropdown close automatically when cancel invoice clicked 

document.addEventListener("DOMContentLoaded", function () {
  const cancelBtns = document.querySelectorAll(".cancelBtn");
  const cancelModal = document.getElementById("cancelModal");
  const confirmCancel = document.getElementById("confirmCancel");
  const cancelCancel = document.getElementById("cancelCancel");
  const closeCancelPopup = document.getElementById("close-cancel-popup");

  if (cancelBtns.length > 0) {
    cancelBtns.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
          dropdown.style.display = "none";
        });
        if (cancelModal) {
          cancelModal.style.display = "flex";
        }
      });
    });
  }

  if (confirmCancel) {
    confirmCancel.addEventListener("click", function () {
      alert("Invoice cancelled!");
      if (cancelModal) {
        cancelModal.style.display = "none";
      }
    });
  }

  if (cancelCancel || closeCancelPopup) {
    const closeFn = () => {
      if (cancelModal) {
        cancelModal.style.display = "none";
      }
    };
    cancelCancel?.addEventListener("click", closeFn);
    closeCancelPopup?.addEventListener("click", closeFn);
  }

  if (actionButtons.length > 0) {
    actionButtons.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        const dropdown = btn.nextElementSibling;
        document.querySelectorAll(".dropdown-content").forEach((content) => {
          if (content !== dropdown) {
            content.style.display = "none";
          }
        });
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      });
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === cancelModal) {
      cancelModal.style.display = "none";
    }
    document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
      dropdown.style.display = "none";
    });
  });
});



// Total sale calander

document.addEventListener("DOMContentLoaded", function () {
  const fromDate = document.getElementById("fromDate");
  const toDate = document.getElementById("toDate");
  const tableRows = document.querySelectorAll(".monthly_sale_table_body tr");

  const today = new Date().toISOString().split("T")[0];
  fromDate.setAttribute("max", today);
  toDate.setAttribute("max", today);

  fromDate.addEventListener("change", function () {
    toDate.setAttribute("min", fromDate.value);
    filterTable();
  });

  toDate.addEventListener("change", function () {
    fromDate.setAttribute("max", toDate.value);
    filterTable();
  });

  function filterTable() {
    const from = fromDate.value ? new Date(fromDate.value) : null;
    const to = toDate.value ? new Date(toDate.value) : null;

    tableRows.forEach(row => {
      const dateText = row.cells[0].innerText;
      const rowDate = new Date(dateText.split("-").reverse().join("-"));

      if (
        (from && rowDate < from) ||
        (to && rowDate > to)
      ) {
        row.style.display = "none";
      } else {
        row.style.display = "";
      }
    });
  }
});

// assign item total old gold

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("assignModal");
  var btn = document.getElementById("goldassign");
  var closeBtn = document.querySelector(".goldclose");
  var confirmBtn = document.getElementById("confirmBtn");
  var cancelBtn = document.getElementById("cancelBtn");

  btn.onclick = function () {
    modal.style.display = "block";
  };

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  confirmBtn.onclick = function () {
    alert("Item successfully assigned!");
    modal.style.display = "none";
  };

  cancelBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});


// assign item total old silver

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("silverassignModal");
  var btn = document.getElementById("silverassign");
  var closeBtn = document.querySelector(".silverclose");
  var confirmBtn = document.getElementById("confirmSilverBtn");
  var cancelBtn = document.getElementById("cancelSilverBtn");

  btn.onclick = function () {
    modal.style.display = "block";
  };
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  confirmBtn.onclick = function () {
    alert("Old Silver successfully assigned!");
    modal.style.display = "none";
  };
  cancelBtn.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});

// assign item total old stone

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("stoneassignModal");
  var btn = document.getElementById("stoneassign");
  var closeBtn = document.querySelector(".stoneclose");
  var confirmBtn = document.getElementById("confirmStoneBtn");
  var cancelBtn = document.getElementById("cancelStoneBtn");

  btn.onclick = function () {
    modal.style.display = "block";
  };
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  confirmBtn.onclick = function () {
    alert("Old Stone successfully assigned!");
    modal.style.display = "none";
  };
  cancelBtn.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});


//  create invoice popup

document.addEventListener("DOMContentLoaded", function () {
  const createSaleBtn = document.getElementById("Create_Sale_inv");
  const createInvoicePopup = document.querySelector(".create_inv_cont");
  const backButtons = document.querySelectorAll(".back_icon");

  function showCreateInvoicePopup() {
    if (createInvoicePopup) {
      createInvoicePopup.style.display = "flex";
    }
  }

  function hideInvoicePopups() {
    const popups = document.querySelectorAll(".create_inv_cont, .edit_inv_cont, .view_inv_cont, .ret_inv_cont");
    popups.forEach(popup => {
      popup.style.display = "none";
    });
  }

  if (createSaleBtn) {
    createSaleBtn.addEventListener("click", function () {
      showCreateInvoicePopup();
    });
  }

  backButtons.forEach(button => {
    button.addEventListener("click", function () {
      hideInvoicePopups();
    });
  });
});


// Invoice History

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");
  const invoiceButtons = document.querySelectorAll(".custom-history-invoice");
  const popup = document.getElementById("invoicePopupContainer");
  const popupTitle = document.getElementById("invoiceNumber");
  invoiceButtons.forEach(button => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("Invoice History button clicked");
      const invoiceNumber = this.getAttribute("data-invoice") || "INV0003";
      popupTitle.textContent = invoiceNumber;

      popup.style.display = "flex";
    });
  });
});
function closeInvoicePopup() {
  console.log("Closing popup");
  document.getElementById("invoicePopupContainer").style.display = "none";
}

// All invoice card Pop up

function openPopup(popupId) {
  document.getElementById(popupId).style.right = '0';
  document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
  let popups = document.querySelectorAll('.card-right-popup');
  popups.forEach(popup => popup.style.right = '-600px');
  document.getElementById('overlay').style.display = 'none';
}


// Import

document.addEventListener("DOMContentLoaded", function () {
  const importDataBtns = document.querySelectorAll(".importdataBtn");
  const importDataModal = document.getElementById("importDataModal");
  const confirmImport = document.getElementById("confirmImport");
  const cancelImport = document.getElementById("cancelImport");

  importDataBtns.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      importDataModal.style.display = "flex";
    });
  });

  confirmImport.addEventListener("click", function () {
    alert("Data imported successfully!");
    importDataModal.style.display = "none";
  });

  cancelImport.addEventListener("click", function () {
    importDataModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === importDataModal) {
      importDataModal.style.display = "none";
    }
  });
});


// Total old gold exchange

function openGoldPopup() {
  document.getElementById("goldPopup").style.right = "0";
}

function closeGoldPopup() {
  document.getElementById("goldPopup").style.right = "-600px";
}

// Total old silver exchange

function openSilverPopup() {
  document.getElementById("silverPopup").style.right = "0";
}

function closeSilverPopup() {
  document.getElementById("silverPopup").style.right = "-600px";
}

// Total old stone exchange

function openStonePopup() {
  document.getElementById("stonePopup").style.right = "0";
}

function closeStonePopup() {
  document.getElementById("stonePopup").style.right = "-600px";
}

// Custom date range selector

const startDates = document.getElementById("start-dates");
const endDates = document.getElementById("end-dates");
const rangeDisplay = document.getElementById("selected-range");
const calendarPopup = document.getElementById("calendar-popup");
const togglePickerBtn = document.getElementById("togglePicker");
const startMonthSelect = document.getElementById("start-month");
const startYearSelect = document.getElementById("start-year");
const endMonthSelect = document.getElementById("end-month");
const endYearSelect = document.getElementById("end-year");
let selectedStart = new Date();
let selectedEnd = new Date();
togglePickerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  calendarPopup.classList.toggle("show");
});
function populateMonthYear(selectMonth, selectYear, selectedDate, onChangeCallback) {
  selectMonth.innerHTML = '';
  selectYear.innerHTML = '';
  const currentYear = new Date().getFullYear();
  for (let m = 0; m < 12; m++) {
    const opt = document.createElement("option");
    opt.value = m;
    opt.text = new Date(0, m).toLocaleString("default", { month: "short" });
    if (m === selectedDate.getMonth()) opt.selected = true;
    selectMonth.appendChild(opt);
  }
  for (let y = currentYear - 10; y <= currentYear + 10; y++) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.text = y;
    if (y === selectedDate.getFullYear()) opt.selected = true;
    selectYear.appendChild(opt);
  }
  selectMonth.addEventListener("change", () => onChangeCallback());
  selectYear.addEventListener("change", () => onChangeCallback());
}
function renderCalendar(container, selectedDate, isStart) {
  container.innerHTML = "";
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay.getDay();
  let day = 1;
  let row;
  for (let i = 0; i < 6; i++) {
    row = document.createElement("tr");
    let rowCompleted = false;
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      if (i === 0 && j < startDay) {
        cell.innerText = "";
      }
      else if (day > lastDate) {
        cell.innerText = "";
      }
      else {
        const currentDate = new Date(year, month, day);
        cell.innerText = day;
        if ((isStart && isSameDate(currentDate, selectedStart)) ||
          (!isStart && isSameDate(currentDate, selectedEnd))) {
          cell.classList.add("selected");
        }
        else if (currentDate > selectedStart && currentDate < selectedEnd) {
          cell.classList.add("in-range");
        }
        cell.onclick = () => {
          if (isStart) {
            selectedStart = currentDate;
            if (selectedStart > selectedEnd) selectedEnd = selectedStart;
          }
          else {
            selectedEnd = currentDate;
            if (selectedEnd < selectedStart) selectedStart = selectedEnd;
          }
          updateRangeDisplay();
          renderAllCalendars();
        };
        day++;
      }
      if (cell.innerText !== "") rowCompleted = true;
      row.appendChild(cell);
    }
    if (rowCompleted) {
      container.appendChild(row);
    }
    if (day > lastDate) break;
  }
}
function isSameDate(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}
function updateRangeDisplay() {
  const opts = { month: "short", day: "numeric" };
  rangeDisplay.innerText = `${selectedStart.toLocaleDateString("en-US", opts)} - ${selectedEnd.toLocaleDateString("en-US", opts)}`;
}
function renderAllCalendars() {
  selectedStart.setFullYear(parseInt(startYearSelect.value));
  selectedStart.setMonth(parseInt(startMonthSelect.value));
  selectedEnd.setFullYear(parseInt(endYearSelect.value));
  selectedEnd.setMonth(parseInt(endMonthSelect.value));
  renderCalendar(startDates, selectedStart, true);
  renderCalendar(endDates, selectedEnd, false);
}
function quickSet(type) {
  const today = new Date();
  let start, end;
  switch (type) {
    case 'today':
      start = end = new Date();
      break;
    case 'yesterday':
      start = end = new Date(today.setDate(today.getDate() - 1));
      break;
    case 'last7':
      end = new Date();
      start = new Date();
      start.setDate(end.getDate() - 6);
      break;
    case 'last30':
      end = new Date();
      start = new Date();
      start.setDate(end.getDate() - 29);
      break;
    case 'entire':
      start = new Date(today.getFullYear(), 0, 1);
      end = new Date();
      break;
  }
  selectedStart = start;
  selectedEnd = end;
  updateRangeDisplay();
  renderAllCalendars();
}
function toggleCompareMode() {
  alert("(Custom Ranges is not available right now)");
}
window.addEventListener("click", function (e) {
  if (!calendarPopup.contains(e.target) && !togglePickerBtn.contains(e.target)) {
    calendarPopup.classList.remove("show");
  }
});
populateMonthYear(startMonthSelect, startYearSelect, selectedStart, renderAllCalendars);
populateMonthYear(endMonthSelect, endYearSelect, selectedEnd, renderAllCalendars);
updateRangeDisplay();
renderAllCalendars();


// Edit invoice Pop up and View  and return invoice Pop up 

document.querySelectorAll(".edit_invoice_btn").forEach(button => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const editPanel = document.querySelector(".edit_inv_cont");
    if (editPanel.style.display === "none" || editPanel.style.display === "") {
      editPanel.style.display = "flex";
    } else {
      editPanel.style.display = "none";
    }
  });
});
document.querySelectorAll(".view_invoice_btn").forEach(button => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const viewPanel = document.querySelector(".view_inv_cont");
    if (viewPanel.style.display === "none" || viewPanel.style.display === "") {
      viewPanel.style.display = "flex";
    } else {
      viewPanel.style.display = "none";
    }
  });
});

document.querySelectorAll(".return_invoice_btn").forEach(button => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const returnPanel = document.querySelector(".ret_inv_cont");
    if (returnPanel.style.display === "none" || returnPanel.style.display === "") {
      returnPanel.style.display = "flex";
    } else {
      returnPanel.style.display = "none";
    }
  });
});

// Recover item

const deleterecoverBtn = document.getElementById('deleterecover-main-btn');
const deleterecoverOverlay = document.getElementById('deleterecover-popup-overlay');
const deleterecoverCancel = document.getElementById('deleterecover-cancel-btn');
const deleterecoverConfirm = document.getElementById('deleterecover-confirm-btn');
const deleterecoverClose = document.getElementById('deleterecover-close-btn');
const cancelrecoverBtn = document.getElementById('cancelrecover-main-btn');
const cancelrecoverOverlay = document.getElementById('cancelrecover-popup-overlay');
const cancelrecoverCancel = document.getElementById('cancelrecover-cancel-btn');
const cancelrecoverConfirm = document.getElementById('cancelrecover-confirm-btn');
const cancelrecoverClose = document.getElementById('cancelrecover-close-btn');

deleterecoverBtn.onclick = () => {
  deleterecoverOverlay.style.display = 'flex';
};

deleterecoverCancel.onclick = () => {
  deleterecoverOverlay.style.display = 'none';
};

deleterecoverConfirm.onclick = () => {
  alert('Recover action confirmed!');
  deleterecoverOverlay.style.display = 'none';
};

deleterecoverClose.onclick = () => {
  deleterecoverOverlay.style.display = 'none';
};
cancelrecoverBtn.onclick = () => {
  cancelrecoverOverlay.style.display = 'flex';
};

cancelrecoverCancel.onclick = () => {
  cancelrecoverOverlay.style.display = 'none';
};

cancelrecoverConfirm.onclick = () => {
  alert('Recover action confirmed!');
  cancelrecoverOverlay.style.display = 'none';
};

cancelrecoverClose.onclick = () => {
  cancelrecoverOverlay.style.display = 'none';
};
